import {Pizza} from '../../models/pizza.model';
import {PizzasActionTypes, PizzasActionUnion} from '../actions';

export interface PizzaState {
    data: Pizza[];
    loaded: boolean;
    loading: boolean;
}

export const initialState: PizzaState = {
    data: [],
    loaded: false,
    loading: false
};

export function pizzaReducer(state = initialState, action: PizzasActionUnion): PizzaState {
    switch (action.type) {
        case PizzasActionTypes.Load: {
            return {
                ...state,
                loading: true,
                loaded: false
            };
        }

        case PizzasActionTypes.LoadSuccess: {
            console.log(action.payload);
            return {
                ...state,
                loading: false,
                loaded: true,
                data: [...action.payload]
            };
        }

        case PizzasActionTypes.LoadFail: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        default:
            return state;
    }
}

// небольшие функции которые помогут вытащить нужную дату из store
export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
export const getPizzas = (state: PizzaState) => state.data;
