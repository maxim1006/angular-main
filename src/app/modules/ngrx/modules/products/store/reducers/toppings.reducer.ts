import * as fromToppings from '../actions/toppings.action';
import {Topping} from '../../models/topping.model';
import {Pizza} from '../../models/pizza.model';

export interface ToppingsState {
    entities: {
        [id: number]: Topping;
    };
    loaded?: boolean;
    loading?: boolean;
}

export const initialState: ToppingsState = {
    entities: {},
    loaded: false,
    loading: false
};



export function reducer(state = initialState, action: fromToppings.ToppingsActionUnion): ToppingsState {

    switch (action.type) {
        case fromToppings.ToppingsActionTypes.Load: {
            return {
                ...state,
                loading: true
            };
        }

        case fromToppings.ToppingsActionTypes.LoadSuccess: {
            const toppings = action.payload;

            const entities =  toppings.reduce((entities: {[id: number]: Topping}, topping) => {
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

        case fromToppings.ToppingsActionTypes.LoadFail: {
            return {
                ...state,
                loaded: false,
                loading: false
            };
        }
    }

    return state;

}

export const  getToppingEntities = (state: ToppingsState) => state.entities;
export const  getToppingsLoaded = (state: ToppingsState) => state.loaded;
export const  getToppingsLoading = (state: ToppingsState) => state.loading;
