import * as fromPizzasReducer from './pizzas.reducer';
import * as fromToppingsReducer from './toppings.reducer';
import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';


export interface ProductsState {
    pizzas: fromPizzasReducer.PizzaState;
    toppings: fromToppingsReducer.ToppingsState;
}

export const productsReducers: ActionReducerMap<ProductsState> = {
    pizzas: fromPizzasReducer.reducer,
    toppings: fromToppingsReducer.reducer
};

export const getProductsState = createFeatureSelector<ProductsState>('products'); // тут 'products' должна быть такой же как в StoreModule.forFeature('products', productsReducers)

