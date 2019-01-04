import {ToppingsService} from '../../services/toppings.service';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {
    LoadToppingsAction, LoadToppingsFailAction, LoadToppingsSuccessAction,
    ToppingsActionTypes
} from '../actions/toppings.action';
import {catchError, map, switchMap} from 'rxjs/internal/operators';
import {of} from 'rxjs/index';

@Injectable()
export class ToppingsEffects {

    constructor(private actions$: Actions, private toppingsService: ToppingsService) {}

    @Effect()
    loadToppings$ = this.actions$.pipe(
        ofType(ToppingsActionTypes.Load),
        switchMap(() =>
            this.toppingsService.getToppings().pipe(

                map(data => new LoadToppingsSuccessAction(data)),
                catchError(error => of(new LoadToppingsFailAction(error)))

            )
        )
    );

}
