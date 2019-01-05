import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Actions } from '@ngrx/effects';

import { hot, cold } from 'jasmine-marbles';
import {Observable, empty, of, EMPTY} from 'rxjs';

import { PizzasService } from '../../services/pizzas.service';
import * as fromEffects from './pizzas.effects';
import * as fromActions from '../actions/pizzas.action';

export class TestActions extends Actions {
    constructor() {
        super(EMPTY);
    }

    set stream(source: Observable<any>) {
        this.source = source;
    }
}

export function getActions() {
    return new TestActions();
}

describe('PizzasEffects', () => {
    let actions$: TestActions;
    let service: PizzasService;
    let effects: fromEffects.PizzasEffects;

    const pizzas = [
        {
            id: 1,
            name: 'Pizza #1',
            toppings: [
                { id: 1, name: 'onion' },
                { id: 2, name: 'mushroom' },
                { id: 3, name: 'basil' },
            ],
        },
        {
            id: 2,
            name: 'Pizza #2',
            toppings: [
                { id: 1, name: 'onion' },
                { id: 2, name: 'mushroom' },
                { id: 3, name: 'basil' },
            ],
        },
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                PizzasService,
                fromEffects.PizzasEffects,
                { provide: Actions, useFactory: getActions },
            ],
        });

        actions$ = TestBed.get(Actions);
        service = TestBed.get(PizzasService);
        effects = TestBed.get(fromEffects.PizzasEffects);

        spyOn(service, 'getPizzas').and.returnValue(of(pizzas));
        spyOn(service, 'createPizza').and.returnValue(of(pizzas[0]));
        spyOn(service, 'updatePizza').and.returnValue(of(pizzas[0]));
        spyOn(service, 'removePizza').and.returnValue(of(pizzas[0]));
    });

    describe('loadPizzas$', () => {
        it('should return a collection from LoadPizzasSuccess', () => {
            const action = new fromActions.LoadPizzasAction();
            const completion = new fromActions.LoadPizzasSuccessAction(pizzas);

            actions$.stream = hot('-a', { a: action });
            const expected = cold('-b', { b: completion });

            expect(effects.loadPizzas$).toBeObservable(expected);
        });
    });

    describe('createPizza$', () => {
        it('should work', () => {
            const action = new fromActions.CreatePizzaAction(pizzas[0]);
            const completion = new fromActions.CreatePizzaSuccessAction(pizzas[0]);

            actions$.stream = hot('-a', { a: action });
            const expected = cold('-c', { c: completion });

            expect(effects.createPizza$).toBeObservable(expected);
        });
    });

    describe('updatePizza$', () => {
        it('should work', () => {
            const action = new fromActions.UpdatePizzaAction(pizzas[0]);
            const completion = new fromActions.UpdatePizzaSuccessAction(pizzas[0]);

            actions$.stream = hot('-a', { a: action });
            const expected = cold('-c', { c: completion });

            expect(effects.updatePizza$).toBeObservable(expected);
        });
    });

    describe('removePizza$', () => {
        it('should work', () => {
            const action = new fromActions.RemovePizzaAction(pizzas[0]);
            const completion = new fromActions.RemovePizzaSuccessAction(pizzas[0]);

            actions$.stream = hot('-a', { a: action });
            const expected = cold('-c', { c: completion });

            expect(effects.removePizza$).toBeObservable(expected);
        });
    });
});