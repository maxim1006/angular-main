import {FamilyMember} from "../../components/ngrx-effects.component";
import {FamilyActionsUnion, FamilyActionTypes} from "../actions/family.action";

let initialState = [];

export function familyReducer(state: FamilyMember[] = initialState, action: FamilyActionsUnion) {

    switch (action.type) {
        case FamilyActionTypes.LoadSuccess:
            initialState = [...action.payload];
            return initialState;

        case FamilyActionTypes.Add:
            state.push(action.payload);

            return [...state];

        case FamilyActionTypes.Remove:
            state.splice(state.indexOf(action.payload), 1);

            return [...state];

        case FamilyActionTypes.Reset:
            return [...initialState];

        default:

            return state;
    }

}
