import { Action } from "@ngrx/store";
import { Topping } from "@models/topping.model";

export enum ToppingsActionTypes {
    Load = "[Products] Load Toppings",
    LoadSuccess = "[Products] Load Success Toppings",
    LoadFail = "[Products] Load Fail Toppings",
    VisualiseToppings = "[Products] Visualize toppings",
}

export class LoadToppingsAction implements Action {
    readonly type = ToppingsActionTypes.Load;
}

export class LoadToppingsSuccessAction implements Action {
    readonly type = ToppingsActionTypes.LoadSuccess;

    constructor(public payload: Topping[]) {}
}

export class LoadToppingsFailAction implements Action {
    readonly type = ToppingsActionTypes.LoadFail;

    constructor(public payload: any) {}
}

export class VisualiseToppingsAction implements Action {
    readonly type = ToppingsActionTypes.VisualiseToppings;

    constructor(public payload: number[]) {}
}

export type ToppingsActionUnion =
    | LoadToppingsAction
    | LoadToppingsSuccessAction
    | LoadToppingsFailAction
    | VisualiseToppingsAction;
