import {CounterActionTypes, CounterActionsUnion} from '../actions/counter.action';

export type CounterState = number;

const initialState = 0;


export function reducer(state: CounterState = initialState, action: CounterActionsUnion) {
    switch (action.type) {
        case CounterActionTypes.Increment:

            return state + action.payload;

        case CounterActionTypes.Decrement:

            return state + action.payload;

        case CounterActionTypes.MultiplyBy:
            console.log(state * action.payload);
            return state * action.payload;

        default:

            return state;
    }
}

export const getCurrentCounter = (state: CounterState) => {
    return state;
};
