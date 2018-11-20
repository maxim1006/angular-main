import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs/internal/Observable";
import {CounterDecrementAction, CounterIncrementAction} from "./store/actions/counter.action";
import * as fromStore from "./store";

interface AppState {
    counter: number;
}

@Component({
    selector: 'm-ngrx',
    templateUrl: 'ngrx.component.html'
})
export class MNgrxComponent implements OnInit {
    /** @internal */
    public _counter$: Observable<number>;
    public _counterSelector$: Observable<number>;
    public _counterRouteSelector$: Observable<any>;

    /** @internal */
    public _increase(): void {
        this.store.dispatch(new CounterIncrementAction(1))
    };

    /** @internal */
    public _decrease(): void {
        this.store.dispatch(new CounterDecrementAction(-1))
    };

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
        this._counter$ = this.store.pipe(select('counter'));
        this._counterSelector$ = this.store.pipe(select(fromStore.getCurrentCounter));
        this._counterRouteSelector$ = this.store.pipe(select(fromStore.getCurrentCounterRouteState));
    }
}

