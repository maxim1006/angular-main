import {Action} from "@ngrx/store";
import {FamilyMember} from "@models/family.model";

export enum FamilyActionTypes {
    Load = '[Family] Load',
    LoadSuccess = '[Family] Load Success',
    LoadFail  = '[Family] Load Failure',
    Add = '[Family] Add',
    Remove = '[Family] Remove',
    Reset = '[Family] Reset',
    ServerSearch = '[Family] Server Search',
    ServerSearchSuccess = '[Family] Server Search success',
    ServerSearchFail = '[Family] Server Search fail',
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

export class FamilyServerSearchAction implements Action {
    readonly type = FamilyActionTypes.ServerSearch;

    constructor(public payload: string) {}
}

export class FamilyServerSearchSuccessAction implements Action {
    readonly type = FamilyActionTypes.ServerSearchSuccess;

    constructor(public payload: FamilyMember[]) {}
}

export class FamilyServerSearchFailAction implements Action {
    readonly type = FamilyActionTypes.ServerSearchFail;

    constructor(public payload: any) {}
}


export type FamilyActionsUnion =
    | LoadFamilyAction
    | LoadFamilySuccessAction
    | LoadFamilyFailAction
    | FamilyAddAction
    | FamilyRemoveAction
    | FamilyResetAction
    | FamilyServerSearchAction
    | FamilyServerSearchSuccessAction
    | FamilyServerSearchFailAction;
