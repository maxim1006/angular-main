import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs/internal/Observable";
import * as fromStore from '../store';
import {FamilyMember} from "@models/family.model";



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
        
        <p>Family server search:</p>
        <input 
            type="text" 
            #searchInput
            placeholder="family member name"
            (input)="_onInput(searchInput.value)"
        >
        <span *ngIf="_searchLoading$ | async">Loading...</span>
        <ul>
            <li *ngFor="let member of _foundFamilyMember$ | async">
                {{member.name}}:
                {{member.age}} years
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
    public _family$: Observable<FamilyMember[]> = this.store.pipe(select(fromStore.getFamilyMembers));

    /** @internal */
    public _foundFamilyMember$: Observable<FamilyMember[]> = this.store.pipe(select(fromStore.getFamilyFoundMembers));

    /** @internal */
    public _searchLoading$: Observable<boolean> = this.store.pipe(select(fromStore.getFamilySearchLoading));

    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        this.store.dispatch(new fromStore.LoadFamilyAction());
    }

    /** @internal */
    public _addFamilyMember(inputName: HTMLInputElement, inputAge: HTMLInputElement, event: Event): void {

        event.preventDefault();

        let name = inputName.value,
            age = +inputAge.value;

        if (!name) {
            return;
        }

        this.store.dispatch(new fromStore.FamilyAddAction({
            name,
            age,
            id: + new Date()
        }));
    }

    /** @internal */
    public _removeFamilyMember(familyMember: FamilyMember): void {
        this.store.dispatch(new fromStore.FamilyRemoveAction(familyMember));
    }

    /** @internal */
    public _resetFamily(): void {
        this.store.dispatch(new fromStore.FamilyResetAction());
    }

    /** @internal */
    public _onInput(value): void {
        this.store.dispatch(new fromStore.FamilyServerSearchAction(value));
    }
}
