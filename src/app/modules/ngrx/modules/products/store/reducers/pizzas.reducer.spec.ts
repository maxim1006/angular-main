import * as fromPizzasReducer from './pizzas.reducer';
import * as fromPizzasActions from '../actions/pizzas.action';
import {Pizza} from "../../models/pizza.model";

describe('PizzasReducer', () => {
    describe('undefined action', () => {
        it('should return default state', () => {
            const { initialState } = fromPizzasReducer;
            const action = {} as any;
            const state = fromPizzasReducer.reducer(undefined, action);

            expect(state).toBe(initialState);
        })
    });

    describe('Load Pizza action', () => {
        it('should set loading to true', () => {
            const { initialState } = fromPizzasReducer;
            const action = new fromPizzasActions.LoadPizzasAction();
            const state = fromPizzasReducer.reducer(initialState, action);

            expect(state.entities).toEqual({});
            expect(state.loaded).toEqual(false);
            expect(state.loading).toEqual(true);
        })
    });

    describe('Load Pizza Success action', () => {
        it('should map an array to entities', () => {
            const pizzas: Pizza[] = [
                {id: 1, name: 'Pizza #1', toppings: []},
                {id: 2, name: 'Pizza #2', toppings: []}
            ];
            const entities = {
                1: pizzas[0],
                2: pizzas[1],
            };
            const { initialState } = fromPizzasReducer;
            const action = new fromPizzasActions.LoadPizzasSuccessAction(pizzas);
            const state = fromPizzasReducer.reducer(initialState, action);

            expect(state.entities).toEqual(entities);
            expect(state.loaded).toEqual(true);
            expect(state.loading).toEqual(false);
        })
    });
});
