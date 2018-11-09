import {createSelector} from '@ngrx/store';
import * as fromRoot from '../../../../store';
import * as fromPizzasReducer from '../reducers/pizzas.reducer';
import * as fromFeature from '../reducers';
import * as fromToppings from './toppings.selectors';
import {Pizza} from '../../models/pizza.model';


// pizza state, те сверху мы получили продукты, а теперь стейт для пиц, когда мы внутри пиц,
// мы можем использовать пицца редюсеры, селекторы мемоизированы и нужны чтобы быстро
// добираться до свойств стора. Тут спускаюсь по стейт три вниз от продуктов до пиц,
// от пиц до ее свойств
export const getPizzaState = createSelector(fromFeature.getProductsState, (state: fromFeature.ProductsState) => state.pizzas);

export const getPizzaEntities = createSelector(getPizzaState, fromPizzasReducer.getPizzaEntities);

export const getSelectedPizza = createSelector(
    getPizzaEntities,
    fromRoot.getRouterState,
    (entities, router): Pizza => {
        return router.state && entities[router.state.params.pizzaId];
    }
);

export const getAllPizzas = createSelector(getPizzaEntities, (entities) => {
    return Object.keys(entities).map(id => entities[id]);
});

export const getPizzaVisualised = createSelector(
    getSelectedPizza,
    fromToppings.getToppingEntities,
    fromToppings.getSelectedToppings,
    (pizza, toppingEntities, selectedToppings) => {
        const toppings = selectedToppings.map(id => toppingEntities[id]);
        return {...pizza, toppings};
    }
);

export const getPizzasLoaded = createSelector(getPizzaState, fromPizzasReducer.getPizzasLoaded);

export const getPizzasLoading = createSelector(getPizzaState, fromPizzasReducer.getPizzasLoading);
