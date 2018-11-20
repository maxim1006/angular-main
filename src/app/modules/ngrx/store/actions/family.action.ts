import {Action} from "@ngrx/store";
import {FamilyMember} from "../../models/family.model";

export enum FamilyActionTypes {
    Load = '[Family] Load',
    LoadSuccess = '[Family] Load Success',
    LoadFail  = '[Family] Load Failure',
    Add = '[Family] Add',
    Remove = '[Family] Remove',
    Reset = '[Family] Reset'
}

export class LoadFamilyAction implements Action {
    readonly type = FamilyActionTypes.Load;
}

export class LoadFamilySuccessAction implements Action {
    readonly type = FamilyActionTypes.LoadSuccess;

    constructor(public payload: FamilyMember[]) {}
}

export class LoadFamilyFailAction implements Action {
    readonly type = FamilyActionTypes.LoadFail;

    constructor(public payload: any) {}
}

export class FamilyAddAction implements Action {
    readonly type = FamilyActionTypes.Add;

    constructor(public payload: FamilyMember) {}
}

export class FamilyRemoveAction implements Action {
    readonly type = FamilyActionTypes.Remove;

    constructor(public payload: FamilyMember) {}
}

export class FamilyResetAction implements Action {
    readonly type = FamilyActionTypes.Reset;
}


export type FamilyActionsUnion =
    | LoadFamilyAction
    | LoadFamilySuccessAction
    | LoadFamilyFailAction
    | FamilyAddAction
    | FamilyRemoveAction
    | FamilyResetAction;
