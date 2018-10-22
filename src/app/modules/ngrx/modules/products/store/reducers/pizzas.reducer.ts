import {Pizza} from '../../models/pizza.model';
import {PizzasActionTypes, PizzasActionUnion} from '../actions';

export interface PizzaState {
    entities?: {[id: number]: Pizza};
    loaded: boolean;
    loading: boolean;
}

export const initialState: PizzaState = {
    entities: {},
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
            const pizzas = action.payload;

            // превращаю массив в объект
            const entities =  pizzas.reduce((entities: {[id: number]: Pizza}, pizza) => {
                    return {
                        ...entities,
                        [pizza.id]: pizza
                    };
                },
                {...state.entities}
            );

            return {
                ...state,
                loading: false,
                loaded: true,
                entities
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
export const getPizzaEntities = (state: PizzaState) => state.entities;
export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
