import { StoreModule, Store, combineReducers, select } from "@ngrx/store";
import {
    ROUTER_NAVIGATION,
    StoreRouterConnectingModule,
} from "@ngrx/router-store";

import { fakeAsync, flush, TestBed } from "@angular/core/testing";
import { Pizza } from "@models/pizza.model";

import * as fromRoot from "../../../../store/reducers";
import * as fromReducers from "../reducers";
import * as fromActions from "../actions";
import * as fromSelectors from "../selectors/pizzas.selectors";

describe("Pizzas Selectors", () => {
    let store: Store<fromReducers.ProductsState>;

    const pizza1: Pizza = {
        id: 1,
        name: "Fish 'n Chips",
        toppings: [
            { id: 1, name: "fish" },
            { id: 2, name: "chips" },
            { id: 3, name: "cheese" },
        ],
    };

    const pizza2: Pizza = {
        id: 2,
        name: "Aloha",
        toppings: [
            { id: 1, name: "ham" },
            { id: 2, name: "pineapple" },
            { id: 3, name: "cheese" },
        ],
    };

    const pizza3: Pizza = {
        id: 3,
        name: "Burrito",
        toppings: [
            { id: 1, name: "beans" },
            { id: 2, name: "beef" },
            { id: 3, name: "rice" },
            { id: 4, name: "cheese" },
            { id: 5, name: "avocado" },
        ],
    };

    const pizzas: Pizza[] = [pizza1, pizza2, pizza3];

    const entities = {
        1: pizzas[0],
        2: pizzas[1],
        3: pizzas[2],
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    ...fromRoot.reducers,
                    products: combineReducers(fromReducers.productsReducers),
                }),
            ],
        });

        store = TestBed.get(Store);
    });

    describe("getPizzaState", () => {
        it("should return state of pizza store slice", () => {
            let result;

            store
                .pipe(select(fromSelectors.getPizzaState))
                .subscribe(value => (result = value));

            expect(result).toEqual({
                entities: {},
                loaded: false,
                loading: false,
            });

            store.dispatch(new fromActions.LoadPizzasSuccessAction(pizzas));

            expect(result).toEqual({
                entities,
                loaded: true,
                loading: false,
            });
        });
    });

    describe("getPizzaEntities", () => {
        it("should return pizzas as entities", () => {
            let result;

            store
                .pipe(select(fromSelectors.getPizzaEntities))
                .subscribe(value => (result = value));

            expect(result).toEqual({});

            store.dispatch(new fromActions.LoadPizzasSuccessAction(pizzas));

            expect(result).toEqual(entities);
        });
    });

    describe("getSelectedPizza", () => {
        it("should return selected pizza as an entity", () => {
            let result;
            let params;

            store.dispatch(new fromActions.LoadPizzasSuccessAction(pizzas));

            store.dispatch({
                type: "ROUTER_NAVIGATION",
                payload: {
                    routerState: {
                        url: "/ngrx/products",
                        queryParams: {},
                        params: { pizzaId: "2" },
                    },
                    event: {},
                },
            });

            store
                .pipe(select(fromRoot.getRouterState))
                .subscribe(routerState => {
                    params = routerState.state.params;
                });

            store
                .pipe(select(fromSelectors.getSelectedPizza))
                .subscribe(selectedPizza => (result = selectedPizza));

            if (params) {
                expect(params).toEqual({ pizzaId: "2" });
            }
            expect(result).toEqual(entities[2]);
        });
    });

    describe("getPizzaVisualised", () => {
        it("should return selected pizza composed with selected toppings", () => {
            let result;
            let params;
            const toppings = [
                {
                    id: 6,
                    name: "mushroom",
                },
                {
                    id: 9,
                    name: "pepper",
                },
                {
                    id: 11,
                    name: "sweetcorn",
                },
            ];

            store.dispatch(new fromActions.LoadPizzasSuccessAction(pizzas));
            store.dispatch(new fromActions.LoadToppingsSuccessAction(toppings));
            store.dispatch(new fromActions.VisualiseToppingsAction([11, 9, 6]));

            store.dispatch({
                type: "ROUTER_NAVIGATION",
                payload: {
                    routerState: {
                        url: "/ngrx/products",
                        queryParams: {},
                        params: { pizzaId: "2" },
                    },
                    event: {},
                },
            });

            store
                .pipe(select(fromSelectors.getPizzaVisualised))
                .subscribe(selectedPizza => (result = selectedPizza));

            const expectedToppings = [toppings[2], toppings[1], toppings[0]];

            expect(result).toEqual({
                ...entities[2],
                toppings: expectedToppings,
            });
        });
    });

    describe("getAllPizzas", () => {
        it("should return pizzas as an array", () => {
            let result;

            store
                .pipe(select(fromSelectors.getAllPizzas))
                .subscribe(value => (result = value));

            expect(result).toEqual([]);

            store.dispatch(new fromActions.LoadPizzasSuccessAction(pizzas));

            expect(result).toEqual(pizzas);
        });
    });

    describe("getPizzasLoaded", () => {
        it("should return the pizzas loaded state", () => {
            let result;

            store
                .pipe(select(fromSelectors.getPizzasLoaded))
                .subscribe(value => (result = value));

            expect(result).toEqual(false);

            store.dispatch(new fromActions.LoadPizzasSuccessAction([]));

            expect(result).toEqual(true);
        });
    });

    describe("getPizzasLoading", () => {
        it("should return the pizzas loading state", () => {
            let result;

            store
                .pipe(select(fromSelectors.getPizzasLoading))
                .subscribe(value => (result = value));

            expect(result).toEqual(false);

            store.dispatch(new fromActions.LoadPizzasAction());

            expect(result).toEqual(true);
        });
    });
});
