import {Pizza} from "../../models/pizza.model";
import {LOAD_PIZZAS, LOAD_PIZZAS_FAIL, LOAD_PIZZAS_SUCCESS, PizzasAction} from "../actions/pizzas.action";

export interface PizzaState {
    data: Pizza[];
    loaded: boolean;
    loading: boolean;
}

export const initialState: PizzaState = {
    data: [{
        "name": "Seaside Surfin'",
        "toppings": [
            {
                "id": 6,
                "name": "mushroom"
            },
            {
                "id": 7,
                "name": "olive"
            },
            {
                "id": 2,
                "name": "bacon"
            },
            {
                "id": 3,
                "name": "basil"
            },
            {
                "id": 1,
                "name": "anchovy"
            },
            {
                "id": 8,
                "name": "onion"
            },
            {
                "id": 11,
                "name": "sweetcorn"
            },
            {
                "id": 9,
                "name": "pepper"
            },
            {
                "id": 5,
                "name": "mozzarella"
            }
        ],
        "id": 2
    }],
    loaded: false,
    loading: false
};

export function pizzaReducer(state = initialState, action: PizzasAction): PizzaState {
    switch (action.type) {
        case LOAD_PIZZAS: {
            return {
                ...state,
                loading: true,
                loaded: false
            };
        }

        case LOAD_PIZZAS_SUCCESS: {
            return {
                ...state,
                loading: false,
                loaded: true
            };
        }

        case LOAD_PIZZAS_FAIL: {
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
