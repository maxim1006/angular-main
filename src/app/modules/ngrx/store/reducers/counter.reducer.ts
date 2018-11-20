import {CounterActionTypes, CounterActionsUnion} from "../actions/counter.action";


const INITIAL_STATE = 0;


export function reducer(state: number = INITIAL_STATE, action: CounterActionsUnion) {
    switch (action.type) {
        case CounterActionTypes.Increment:

            return state + action.payload;

        case CounterActionTypes.Decrement:

            return state + action.payload;

        default:

            return state;
    }
}
