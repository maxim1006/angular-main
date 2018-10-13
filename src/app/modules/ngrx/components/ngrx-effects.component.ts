import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs/internal/Observable";
import {FamilyAddAction, FamilyLoadAction, FamilyRemoveAction, FamilyResetAction} from "../store/actions/family.action";

export interface FamilyMember {
    name: string;
    age: number;
}

export interface AppState {
    family: {name: string;age: number;}[]
}

@Component({
    selector: 'm-ngrx-effects',
    template: `
        Family:
        
        <ul>
            <li *ngFor="let member of _family$ | async">
                {{member.name}}
                {{member.age}}
                <span
                    [ngStyle]="{
                        cursor: 'pointer'
                    }"
                    (click)="_removeFamilyMember(member)"   
                >x</span>
            </li>
        </ul>
        
        <form>
            <input type="text" placeholder="name" #inputName>
            <input type="text" placeholder="age"  #inputAge>
            <button type="submit"
                    (click)="_addFamilyMember(inputName, inputAge, $event)"
            >add member</button>
        </form>
        <button type="button" (click)="_resetFamily()">Reset family</button>
    `
})
export class MNgrxEffectsComponent implements OnInit {
    /** @internal */
    public _family$: Observable<FamilyMember[]>;

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
        this.store.dispatch(new FamilyLoadAction());
        this._family$ = this.store.pipe(select('family'));
    }

    /** @internal */
    public _addFamilyMember(inputName: HTMLInputElement, inputAge: HTMLInputElement, event: Event): void {

        event.preventDefault();

        let name = inputName.value,
            age = +inputAge.value;

        if (!name) {
            return;
        }

        this.store.dispatch(new FamilyAddAction({
            name,
            age
        }));
    }

    /** @internal */
    public _removeFamilyMember(familyMember: FamilyMember): void {
        this.store.dispatch(new FamilyRemoveAction(familyMember));
    }

    /** @internal */
    public _resetFamily(): void {
        this.store.dispatch(new FamilyResetAction());
    }
}
