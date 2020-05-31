import { Pizza } from "@models/pizza.model";
import * as fromPizzaActions from "../actions";

export interface PizzaState {
    entities?: { [id: number]: Pizza };
    loaded?: boolean;
    loading?: boolean;
    hint?: string;
}

export const initialState: PizzaState = {
    entities: {},
    loaded: false,
    loading: false,
    hint: null,
};

export function reducer(
    state = initialState,
    action: fromPizzaActions.PizzasActionUnion
): PizzaState {
    switch (action.type) {
        case fromPizzaActions.PizzasActionTypes.Load: {
            return {
                ...state,
                loading: true,
                loaded: false,
            };
        }

        case fromPizzaActions.PizzasActionTypes.LoadSuccess: {
            const pizzas = action.payload;

            // превращаю массив в объект
            const entities = pizzas.reduce(
                (entities: { [id: number]: Pizza }, pizza) => {
                    return {
                        ...entities,
                        [pizza.id]: pizza,
                    };
                },
                { ...state.entities }
            );

            return {
                ...state,
                loading: false,
                loaded: true,
                entities,
            };
        }

        case fromPizzaActions.PizzasActionTypes.LoadFail: {
            return {
                ...state,
                loading: false,
                loaded: false,
            };
        }

        case fromPizzaActions.PizzasActionTypes.Create: {
            return {
                ...state,
                loading: true,
                loaded: false,
                hint: "Create in progress",
            };
        }

        case fromPizzaActions.PizzasActionTypes.Update: {
            return {
                ...state,
                loading: true,
                loaded: false,
                hint: "Update in progress",
            };
        }

        // case fromPizzaActions.PizzasActionTypes.CreateSuccess:
        case fromPizzaActions.PizzasActionTypes.CreateSuccess: {
            const newPizza = action.payload;
            const entities = {
                ...state.entities,
                [newPizza.id]: newPizza,
            };

            return {
                ...state,
                entities,
                hint: "Create success",
            };
        }

        case fromPizzaActions.PizzasActionTypes.UpdateSuccess: {
            const newPizza = action.payload;
            const entities = {
                ...state.entities,
                [newPizza.id]: newPizza,
            };

            return {
                ...state,
                entities,
                hint: "Update success",
            };
        }

        case fromPizzaActions.PizzasActionTypes.Remove: {
            return {
                ...state,
                hint: "Remove in progress",
            };
        }

        case fromPizzaActions.PizzasActionTypes.RemoveSuccess: {
            const pizza = action.payload;
            // тут делаю деструктуризацию, нахожу пиццу по id п присваиваю ей переменную removed
            // console.log(removed); // removed pizza
            // а в entities попадут все пиццы кроме удаленной
            const { [pizza.id]: removed, ...entities } = state.entities;

            return {
                ...state,
                entities,
                hint: "Remove success",
            };
        }

        case fromPizzaActions.PizzasActionTypes.ShowHint: {
            console.log("romPizzaActions.PizzasActionTypes.ShowHint ", action);
            return {
                ...state,
                hint: action.payload,
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
export const getPizzasHint = (state: PizzaState) => state.hint;
