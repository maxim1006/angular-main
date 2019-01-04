import * as fromFamilyActions from '../actions';
import {FamilyMember} from '@models/family.model';

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

export function reducer(state: FamilyState = initialState, action: fromFamilyActions.FamilyActionsUnion) {

    switch (action.type) {
        case fromFamilyActions.FamilyActionTypes.LoadSuccess: {
            const familyMembers = action.payload;

            const entities =  familyMembers.reduce((entities: {[id: number]: FamilyMember}, topping) => {
                    return {
                        ...entities,
                        [topping.id]: topping
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
        }


        case fromFamilyActions.FamilyActionTypes.LoadFail: {
            return {
                ...state,
                loaded: false,
                loading: false
            };
        }

        case fromFamilyActions.FamilyActionTypes.Add: {
            const newFamilyMember = action.payload;
            const entities = {
                ...state.entities,
                [newFamilyMember.id]: newFamilyMember
            };

            return {
                ...state,
                entities
            };
        }

        case fromFamilyActions.FamilyActionTypes.Remove: {
            const familyMember = action.payload;
            const {[familyMember.id]: removed, ...entities} = state.entities;

            return {
                ...state,
                entities
            };
        }

        case fromFamilyActions.FamilyActionTypes.ServerSearch: {
            return {
                ...state,
                searchLoading: true
            };
        }

        case fromFamilyActions.FamilyActionTypes.ServerSearchSuccess: {
            const foundFamilyArray = action.payload;

            const foundFamilyEntities = foundFamilyArray.reduce(
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
        }

        case fromFamilyActions.FamilyActionTypes.ServerSearchFail: {
            const foundFamilyEntities = {};

            return {
                ...state,
                foundFamilyEntities,
                searchLoading: false
            };
        }

        case fromFamilyActions.FamilyActionTypes.Reset:
            return {
                ...initialState
            };

        default:
            return state;
    }
}



export const getFamilyEntities = (state: FamilyState) => state.entities;
export const getFamilyLoading = (state: FamilyState) => state.loading;
export const getFamilyLoaded = (state: FamilyState) => state.loaded;
export const getFamilyFoundEntities = (state: FamilyState) => state.foundFamilyEntities;
export const getFamilysSarchLoading = (state: FamilyState) => state.searchLoading;
