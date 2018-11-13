import {Action} from "@ngrx/store";
import {Pizza} from "../../models/pizza.model";

// load pizzaz
export enum PizzasActionTypes {
    Load = '[Products] Load Pizzas',
    LoadSuccess = '[Products] Load Pizzas Success',
    LoadFail = '[Products] Load Pizzas Fail',

    Create = '[Products] Create Pizza',
    CreateSuccess = '[Products] Create Pizza Success',
    CreateFail = '[Products] Create Pizza Faikl'
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

// create pizza
export class CreatePizzaAction implements Action {
    readonly type = PizzasActionTypes.Create;
    constructor(public payload: any) {}
}

export class CreatePizzaSuccessAction implements Action {
    readonly type = PizzasActionTypes.CreateSuccess;
    constructor(public payload: any) {}
}

export class CreatePizzaFailAction implements Action {
    readonly type = PizzasActionTypes.CreateFail;
    constructor(public payload: any) {}
}

// action types
export type PizzasActionUnion =
    | LoadPizzasAction
    | LoadPizzasFailAction
    | LoadPizzasSuccessAction
    | CreatePizzaAction
    | CreatePizzaSuccessAction
    | CreatePizzaFailAction;


