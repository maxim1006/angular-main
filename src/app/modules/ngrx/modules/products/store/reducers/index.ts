import * as fromPizzasReducer from "./pizzas.reducer";
import * as fromToppingsReducer from "./toppings.reducer";
import {ActionReducerMap, createFeatureSelector, createSelector} from "@ngrx/store";


export interface ProductsState {
    pizzas: fromPizzasReducer.PizzaState;
    toppings: fromToppingsReducer.ToppingsState;
}

export const productsReducers: ActionReducerMap<ProductsState> = {
    pizzas: fromPizzasReducer.reducer,
    toppings: fromToppingsReducer.reducer
};

export const getProductsState = createFeatureSelector<ProductsState>('products'); // тут 'products' должна быть такой же как в StoreModule.forFeature('products', productsReducers)

// pizza state, те сверху мы получили продукты, а теперь стейт для пиц, когда мы внутри пиц, мы можем использовать пицца редюсеры, селекторы мемоизированы и нужны чтобы быстро добираться до свойств стора. Тут спускаюсь по стейт три вниз от продуктов до пиц, от пиц до ее свойств
export const getPizzaState = createSelector(getProductsState, (state: ProductsState) => state.pizzas);

export const getPizzaEntities = createSelector(getPizzaState, fromPizzasReducer.getPizzaEntities);

export const getAllPizzas = createSelector(getPizzaEntities, (entities) => {
    return Object.keys(entities).map(id => entities[id]);
});

export const getPizzasLoaded = createSelector(getPizzaState, fromPizzasReducer.getPizzasLoaded);

export const getPizzasLoading = createSelector(getPizzaState, fromPizzasReducer.getPizzasLoading);
