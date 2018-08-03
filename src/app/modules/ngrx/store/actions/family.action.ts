import {Action} from "@ngrx/store";
import {FamilyMember} from "../../components/ngrx-effects.component";

export enum FamilyActionTypes {
    Load = '[Family] Load',
    LoadSuccess = '[Family] Load Success',
    LoadFailure = '[Family] Load Failure',
    Add = '[Family] Add',
    Remove = '[Family] Remove',
    Reset = '[Family] Reset'
}

export class FamilyLoadAction implements Action {
    readonly type = FamilyActionTypes.Load;
}

export class FamilyLoadSuccessAction implements Action {
    readonly type = FamilyActionTypes.LoadSuccess;

    constructor(public payload: FamilyMember[]) {}
}

export class FamilyLoadFailureAction implements Action {
    readonly type = FamilyActionTypes.LoadFailure;

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
    FamilyLoadAction |
    FamilyLoadSuccessAction |
    FamilyLoadFailureAction |
    FamilyAddAction |
    FamilyRemoveAction |
    FamilyResetAction;
