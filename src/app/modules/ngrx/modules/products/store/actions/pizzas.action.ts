import { Action } from "@ngrx/store";
import { Pizza } from "@models/pizza.model";

// load pizzaz
export enum PizzasActionTypes {
    Load = "[Products] Load Pizzas",
    LoadSuccess = "[Products] Load Pizzas Success",
    LoadFail = "[Products] Load Pizzas Fail",

    Create = "[Products] Create Pizza",
    CreateSuccess = "[Products] Create Pizza Success",
    CreateFail = "[Products] Create Pizza Fail",

    Update = "[Products] Update Pizza",
    UpdateSuccess = "[Products] Update Pizza Success",
    UpdateFail = "[Products] Update Pizza Fail",

    Remove = "[Products] Remove Pizza",
    RemoveSuccess = "[Products] Remove Pizza Success",
    RemoveFail = "[Products] Remove Pizza Fail",

    ShowHint = "[Products] Show hint",
}

// Load
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

// create
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

// update
export class UpdatePizzaAction implements Action {
    readonly type = PizzasActionTypes.Update;
    constructor(public payload: Pizza) {}
}

export class UpdatePizzaSuccessAction implements Action {
    readonly type = PizzasActionTypes.UpdateSuccess;
    constructor(public payload: Pizza) {}
}

export class UpdatePizzaFailAction implements Action {
    readonly type = PizzasActionTypes.UpdateFail;
    constructor(public payload: any) {}
}

// remove
export class RemovePizzaAction implements Action {
    readonly type = PizzasActionTypes.Remove;
    constructor(public payload: Pizza) {}
}

export class RemovePizzaSuccessAction implements Action {
    readonly type = PizzasActionTypes.RemoveSuccess;
    constructor(public payload: Pizza) {}
}

export class RemovePizzaFailAction implements Action {
    readonly type = PizzasActionTypes.RemoveFail;
    constructor(public payload: any) {}
}

export class ShowHintAction implements Action {
    readonly type = PizzasActionTypes.ShowHint;
    constructor(public payload: string) {}
}

// action types
export type PizzasActionUnion =
    | LoadPizzasAction
    | LoadPizzasFailAction
    | LoadPizzasSuccessAction
    | CreatePizzaAction
    | CreatePizzaSuccessAction
    | CreatePizzaFailAction
    | UpdatePizzaAction
    | UpdatePizzaSuccessAction
    | UpdatePizzaFailAction
    | RemovePizzaAction
    | RemovePizzaSuccessAction
    | RemovePizzaFailAction
    | ShowHintAction;
