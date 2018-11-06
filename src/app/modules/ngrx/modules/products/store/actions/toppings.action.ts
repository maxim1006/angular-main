import {Action} from '@ngrx/store';
import {Topping} from '../../models/topping.model';

export enum ToppingsActionTypes {
    Load = '[Products] Load Toppings',
    LoadSuccess = '[Products] Load Success Toppings',
    LoadFail = '[Products] Load Fail Toppings'
}

export class LoadToppingsAction implements Action {
    readonly type = ToppingsActionTypes.Load;
}

export class LoadToppingsSuccessAction {
    readonly type = ToppingsActionTypes.LoadSuccess;
    constructor(public payload: Topping[]) {}
}

export class LoadToppingsFailAction {
    readonly type = ToppingsActionTypes.LoadFail;
    constructor(public payload: any) {}
}

export type ToppingsActionUnion = LoadToppingsAction | LoadToppingsSuccessAction | LoadToppingsFailAction;

