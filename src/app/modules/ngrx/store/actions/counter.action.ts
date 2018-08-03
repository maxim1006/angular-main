import {Action} from "@ngrx/store";

export enum CounterActionTypes {
    Increment = '[Counter] Increment',
    Decrement = '[Counter] Decrement'
}

export class CounterIncrementAction implements Action {
    readonly type = CounterActionTypes.Increment;

    constructor(public payload: number) {}
}

export class CounterDecrementAction implements Action {
    readonly type = CounterActionTypes.Decrement;

    constructor(public payload: number) {}
}

export type CounterActionsUnion =
    | CounterIncrementAction
    | CounterDecrementAction;
