import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {
    CreatePizzaAction, CreatePizzaFailAction,
    CreatePizzaSuccessAction,
    LoadPizzasFailAction,
    LoadPizzasSuccessAction,
    PizzasActionTypes
} from '../actions/pizzas.action';
import {catchError, map, switchMap} from 'rxjs/operators';
import {PizzasService} from '../../services';
import {of} from 'rxjs';

@Injectable()
export class PizzasEffects {

    constructor(private actions$: Actions, private pizzasService: PizzasService) {
    }

    @Effect()
    loadPizzas$ = this.actions$.pipe(
        ofType(PizzasActionTypes.Load),
        switchMap(() =>
            this.pizzasService.getPizzas().pipe(
                map(data => new LoadPizzasSuccessAction(data)),
                catchError(error => of(new LoadPizzasFailAction(error)))
            )
        )
    );

    @Effect()
    createPizza$ = this.actions$.pipe(
        ofType(PizzasActionTypes.Create),
        map((action: CreatePizzaAction) => action.payload),
        switchMap((pizza) => {
            return this.pizzasService.createPizza(pizza).pipe(
                map(pizza => new CreatePizzaSuccessAction(pizza)),
                catchError(error => of(new CreatePizzaFailAction(error)))
            );
        })
    );
}
