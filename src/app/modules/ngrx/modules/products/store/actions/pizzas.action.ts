import {Action} from "@ngrx/store";
import {Pizza} from "../../models/pizza.model";

// load pizzaz
export enum PizzasActionTypes {
    Load = '[Products] Load Pizzas',
    LoadSuccess = '[Products] Load Pizzas Success',
    LoadFail = '[Products] Load Pizzas Fail'
}

export class LoadPizzasAction implements Action {
    readonly type = PizzasActionTypes.Load;
}

export class LoadPizzasFailAction implements Action {
    readonly type = PizzasActionTypes.LoadFail;
    constructor(public payload: any) {}
}

export class LoadPizzasSuccessAction implements Action {
    readonly type = PizzasActionTypes.LoadSuccess;
    constructor(public payload: Pizza[]) {}
}

// action types
export type PizzasActionUnion = LoadPizzasAction | LoadPizzasFailAction | LoadPizzasSuccessAction;


