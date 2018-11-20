import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import * as fromPizzaAction from '../actions/pizzas.action';
import {catchError, map, switchMap} from 'rxjs/operators';
import {PizzasService} from '../../services';
import {of} from 'rxjs';

@Injectable()
export class PizzasEffects {

    constructor(private actions$: Actions, private pizzasService: PizzasService) {
    }

    @Effect()
    loadPizzas$ = this.actions$.pipe(
        ofType(fromPizzaAction.PizzasActionTypes.Load),
        switchMap(() =>
            this.pizzasService.getPizzas().pipe(
                map(data => new fromPizzaAction.LoadPizzasSuccessAction(data)),
                catchError(error => of(new fromPizzaAction.LoadPizzasFailAction(error)))
            )
        )
    );

    @Effect()
    createPizza$ = this.actions$.pipe(
        ofType(fromPizzaAction.PizzasActionTypes.Create),
        map((action: fromPizzaAction.CreatePizzaAction) => action.payload),
        switchMap((pizza) => {
            return this.pizzasService.createPizza(pizza).pipe(
                map(pizza => new fromPizzaAction.CreatePizzaSuccessAction(pizza)),
                catchError(error => of(new fromPizzaAction.CreatePizzaFailAction(error)))
            );
        })
    );

    @Effect()
    updatePizza$ = this.actions$.pipe(
        ofType(fromPizzaAction.PizzasActionTypes.Update),
        map((action: fromPizzaAction.UpdatePizzaAction) => action.payload),
        switchMap((pizza) => {
            return this.pizzasService.updatePizza(pizza).pipe(
                map(pizza => new fromPizzaAction.UpdatePizzaSuccessAction(pizza)),
                catchError(error => of(new fromPizzaAction.UpdatePizzaFailAction(error)))
            );
        })
    );

    @Effect()
    removePizza$ = this.actions$.pipe(
        ofType(fromPizzaAction.PizzasActionTypes.Remove),
        map((action: fromPizzaAction.RemovePizzaAction) => action.payload),
        switchMap((pizza) => {
            return this.pizzasService.removePizza(pizza).pipe(
                // бе может не вернуть пиццу, поэтому могу забарать ее из RemovePizzaAction
                map(_ => new fromPizzaAction.RemovePizzaSuccessAction(pizza)),
                catchError(error => of(new fromPizzaAction.RemovePizzaFailAction(error)))
            );
        })
    );
}
