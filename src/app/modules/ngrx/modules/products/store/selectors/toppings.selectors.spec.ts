import * as fromReducers from "../reducers";
import * as fromSelectors from "../selectors";
import * as fromActions from "../actions";
import { combineReducers, select, Store, StoreModule } from "@ngrx/store";
import { Topping } from "@models/topping.model";
import { TestBed } from "@angular/core/testing";

describe("Toppings selectors", () => {
    let store: Store<fromReducers.ProductsState>;

    const toppings: Topping[] = [
        { id: 1, name: "tomato" },
        { id: 2, name: "bacon" },
        { id: 3, name: "pepperoni" },
    ];

    const entities = {
        1: toppings[0],
        2: toppings[1],
        3: toppings[2],
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    products: combineReducers(fromReducers.productsReducers),
                }),
            ],
        });

        store = TestBed.get(Store);

        // делаю шпиона на метод dispatch, callThrough - нужен чтобы ничего в нем не менять
        // spyOn(store, 'dispatch').and.callThrough();
    });

    describe("getToppingEntities", () => {
        it("should return toppings as entities", () => {
            let result;

            store
                .pipe(select(fromSelectors.getToppingEntities))
                .subscribe(value => {
                    result = value;
                });

            expect(result).toEqual({});

            store.dispatch(new fromActions.LoadToppingsSuccessAction(toppings));

            expect(result).toEqual(entities);
        });
    });

    describe("getSelectedEntities", () => {
        it("should return selected toppings as ids", () => {
            let result;

            store
                .pipe(select(fromSelectors.getSelectedToppings))
                .subscribe(value => {
                    result = value;
                });

            store.dispatch(new fromActions.LoadToppingsSuccessAction(toppings));

            expect(result).toEqual([]);

            store.dispatch(new fromActions.VisualiseToppingsAction([1, 3]));

            expect(result).toEqual([1, 3]);
        });
    });
});
