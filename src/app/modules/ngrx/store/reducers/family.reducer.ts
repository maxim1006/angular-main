import * as fromFamilyActions from '../actions/family.action';
import {FamilyMember} from '@models/family.model';
import {Action, createReducer, on} from '@ngrx/store';

export interface FamilyState {
    entities: {
        [id: number]: FamilyMember
    };
    loaded: boolean;
    loading: boolean;
    foundFamilyEntities: {
        [id: number]: FamilyMember
    };
    searchLoading: boolean;
}

const initialState: FamilyState = {
    entities: [],
    loaded: false,
    loading: false,
    foundFamilyEntities: [],
    searchLoading: false
};

// export function reducer(state: FamilyState = initialState, action: fromFamilyActions.FamilyActionsUnion) {
//
//     switch (action.type) {
//         case fromFamilyActions.FamilyActionTypes.LoadSuccess: {
//             const familyMembers = action.payload;
//
//             const entities =  familyMembers.reduce((entities: {[id: number]: FamilyMember}, topping) => {
//                     return {
//                         ...entities,
//                         [topping.id]: topping
//                     };
//                 },
//                 {...state.entities}
//             );
//
//             return {
//                 ...state,
//                 loaded: true,
//                 loading: false,
//                 entities
//             };
//         }
//
//
//         case fromFamilyActions.FamilyActionTypes.LoadFail: {
//             return {
//                 ...state,
//                 loaded: false,
//                 loading: false
//             };
//         }
//
//         case fromFamilyActions.FamilyActionTypes.Add: {
//             const newFamilyMember = action.payload;
//             const entities = {
//                 ...state.entities,
//                 [newFamilyMember.id]: newFamilyMember
//             };
//
//             return {
//                 ...state,
//                 entities
//             };
//         }
//
//         case fromFamilyActions.FamilyActionTypes.Remove: {
//             const familyMember = action.payload;
//             const {[familyMember.id]: removed, ...entities} = state.entities;
//
//             return {
//                 ...state,
//                 entities
//             };
//         }
//
//         case fromFamilyActions.FamilyActionTypes.ServerSearch: {
//             return {
//                 ...state,
//                 searchLoading: true
//             };
//         }
//
//         case fromFamilyActions.FamilyActionTypes.ServerSearchSuccess: {
//             const foundFamilyArray = action.payload;
//
//             const foundFamilyEntities = foundFamilyArray.reduce(
//                 ((accumulator, currentValue) => {
//                     return {
//                         ...accumulator,
//                         [currentValue.id]: currentValue
//                     };
//                 }), {});
//
//             return {
//                 ...state,
//                 foundFamilyEntities,
//                 searchLoading: false
//             };
//         }
//
//         case fromFamilyActions.FamilyActionTypes.ServerSearchFail: {
//             const foundFamilyEntities = {};
//
//             return {
//                 ...state,
//                 foundFamilyEntities,
//                 searchLoading: false
//             };
//         }
//
//         case fromFamilyActions.FamilyActionTypes.Reset:
//             return {
//                 ...initialState
//             };
//
//         default:
//             return state;
//     }
// }

const featureReducer = createReducer(
    initialState,
    on(fromFamilyActions.loadSuccess, (state, {familyMembers}) => {
        const entities = familyMembers.reduce((currentEntities: { [id: number]: FamilyMember }, currentValue) => {
                return {
                    ...currentEntities,
                    [currentValue.id]: currentValue
                };
            },
            {...state.entities}
        );

        return {
            ...state,
            loaded: true,
            loading: false,
            entities
        };
    }),
    on(fromFamilyActions.loadFail, state => ({...state, loaded: false, loading: false})),
    on(fromFamilyActions.add, (state, {newFamilyMember}) => {
        const entities = {
            ...state.entities,
            [newFamilyMember.id]: newFamilyMember
        };

        return {
            ...state,
            entities
        };
    }),
    on(fromFamilyActions.remove, (state, {removedMember}) => {
        const {[removedMember.id]: removed, ...entities} = state.entities;

        return {
            ...state,
            entities
        };
    }),
    on(fromFamilyActions.serverSearch, state => ({...state, searchLoading: true})),
    on(fromFamilyActions.serverSearchSuccess, (state, {foundFamily}) => {
        const foundFamilyEntities = foundFamily.reduce(
            ((accumulator, currentValue) => {
                return {
                    ...accumulator,
                    [currentValue.id]: currentValue
                };
            }), {});

        return {
            ...state,
            foundFamilyEntities,
            searchLoading: false
        };
    }),
    on(fromFamilyActions.serverSearchFail, state => ({...state, foundFamilyEntities: {}, searchLoading: false})),
    on(fromFamilyActions.reset, state => ({...initialState})),
);

export function reducer(state: FamilyState | undefined, action: Action) {
    return featureReducer(state, action);
}

export const getFamilyEntities = (state: FamilyState) => state.entities;
export const getFamilyLoading = (state: FamilyState) => state.loading;
export const getFamilyLoaded = (state: FamilyState) => state.loaded;
export const getFamilyFoundEntities = (state: FamilyState) => state.foundFamilyEntities;
export const getFamilysSarchLoading = (state: FamilyState) => state.searchLoading;
