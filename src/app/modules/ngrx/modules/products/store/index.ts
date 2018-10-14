import * as fromPizzasReducer from "./reducers/pizzas.reducer";
import {pizzaReducer, PizzaState} from "./reducers/pizzas.reducer";
import {ActionReducerMap, createFeatureSelector, createSelector} from "@ngrx/store";


export interface ProductsState {
    pizzas: PizzaState
}

export const productsReducers: ActionReducerMap<ProductsState> = {
    pizzas: pizzaReducer
};

export const getProductsState = createFeatureSelector<ProductsState>('products'); // тут 'products' должна быть такой же как в StoreModule.forFeature('products', productsReducers)

// pizza state, те сверху мы получили продукты, а теперь стейт для пиц, когда мы внутри пиц, мы можем использовать пицца редюсеры, селекторы мемоизированы и нужны чтобы быстро добираться до свойств стора. Тут спускаюсь по стейт три вниз от продуктов до пиц, от пиц до ее свойств
export const getPizzaState = createSelector(getProductsState, (state: ProductsState) => state.pizzas);

export const getAllPizzas = createSelector(getPizzaState, fromPizzasReducer.getPizzas);

export const getPizzasLoaded = createSelector(getPizzaState, fromPizzasReducer.getPizzasLoaded);

export const getPizzasLoading = createSelector(getPizzaState, fromPizzasReducer.getPizzasLoading);
