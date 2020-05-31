import { Action, createAction, props } from "@ngrx/store";
import { FamilyMember } from "@models/family.model";

// export enum FamilyActionTypes {
//     Load = '[Family] Load',
//     LoadSuccess = '[Family] Load Success',
//     LoadFail  = '[Family] Load Failure',
//     Add = '[Family] Add',
//     Remove = '[Family] Remove',
//     Reset = '[Family] Reset',
//     ServerSearch = '[Family] Server Search',
//     ServerSearchSuccess = '[Family] Server Search success',
//     ServerSearchFail = '[Family] Server Search fail',
// }

// export class LoadFamilyAction implements Action {
//     readonly type = FamilyActionTypes.Load;
// }

export const load = createAction("[Family] Load");

// export class LoadFamilySuccessAction implements Action {
//     readonly type = FamilyActionTypes.LoadSuccess;
//
//     constructor(public payload: FamilyMember[]) {}
// }

export const loadSuccess = createAction(
    "[Family] Load Success",
    props<{ familyMembers: FamilyMember[] }>()
);

// export class LoadFamilyFailAction implements Action {
//     readonly type = FamilyActionTypes.LoadFail;
//
//     constructor(public payload: any) {}
// }

export const loadFail = createAction(
    "[Family] Load Failure",
    props<{ payload: any }>()
);

// export class FamilyAddAction implements Action {
//     readonly type = FamilyActionTypes.Add;
//
//     constructor(public payload: FamilyMember) {}
// }

export const add = createAction(
    "[Family] Add",
    props<{
        newFamilyMember: FamilyMember;
    }>()
);

// export class FamilyRemoveAction implements Action {
//     readonly type = FamilyActionTypes.Remove;
//
//     constructor(public payload: FamilyMember) {}
// }

export const remove = createAction(
    "[Family] Remove",
    props<{ removedMember: FamilyMember }>()
);

// export class FamilyResetAction implements Action {
//     readonly type = FamilyActionTypes.Reset;
// }

export const reset = createAction("[Family] Reset");

// export class FamilyServerSearchAction implements Action {
//     readonly type = FamilyActionTypes.ServerSearch;
//
//     constructor(public payload: string) {}
// }

export const serverSearch = createAction(
    "[Family] Server Search",
    props<{ payload: string }>()
);

// export class FamilyServerSearchSuccessAction implements Action {
//     readonly type = FamilyActionTypes.ServerSearchSuccess;
//
//     constructor(public payload: FamilyMember[]) {}
// }

export const serverSearchSuccess = createAction(
    "[Family] Server Search success",
    props<{ foundFamily: FamilyMember[] }>()
);

// export class FamilyServerSearchFailAction implements Action {
//     readonly type = FamilyActionTypes.ServerSearchFail;
//
//     constructor(public payload: any) {}
// }

export const serverSearchFail = createAction(
    "[Family] Server Search fail",
    props<{ payload: any }>()
);

// export type FamilyActionsUnion =
//     | LoadFamilyAction
//     | LoadFamilySuccessAction
//     | LoadFamilyFailAction
//     | FamilyAddAction
//     | FamilyRemoveAction
//     | FamilyResetAction
//     | FamilyServerSearchAction
//     | FamilyServerSearchSuccessAction
//     | FamilyServerSearchFailAction;
