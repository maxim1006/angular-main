import * as fromToppingActions from "../actions/toppings.action";
import { Topping } from "@models/topping.model";
import { Pizza } from "@models/pizza.model";

export interface ToppingsState {
    entities: {
        [id: number]: Topping;
    };
    loaded: boolean;
    loading: boolean;
    selectedToppings: number[];
}

export const initialState: ToppingsState = {
    entities: {},
    loaded: false,
    loading: false,
    selectedToppings: [],
};

export function reducer(
    state = initialState,
    action: fromToppingActions.ToppingsActionUnion
): ToppingsState {
    switch (action.type) {
        case fromToppingActions.ToppingsActionTypes.VisualiseToppings: {
            const selectedToppings = action.payload;
            return {
                ...state,
                selectedToppings,
            };
        }

        case fromToppingActions.ToppingsActionTypes.Load: {
            return {
                ...state,
                loading: true,
            };
        }

        case fromToppingActions.ToppingsActionTypes.LoadSuccess: {
            const toppings = action.payload;

            const entities = toppings.reduce(
                (entities: { [id: number]: Topping }, topping) => {
                    return {
                        ...entities,
                        [topping.id]: topping,
                    };
                },
                { ...state.entities }
            );

            return {
                ...state,
                loaded: true,
                loading: false,
                entities,
            };
        }

        case fromToppingActions.ToppingsActionTypes.LoadFail: {
            return {
                ...state,
                loaded: false,
                loading: false,
            };
        }
    }

    return state;
}

export const getToppingEntities = (state: ToppingsState) => state.entities;
export const getToppingsLoaded = (state: ToppingsState) => state.loaded;
export const getToppingsLoading = (state: ToppingsState) => state.loading;
export const getSelectedToppings = (state: ToppingsState) =>
    state.selectedToppings;
