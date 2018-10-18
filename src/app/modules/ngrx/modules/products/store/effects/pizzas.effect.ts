import {Injectable} from '@angular/core';
import {Effect, Actions, ofType} from "@ngrx/effects";

@Injectable()
export class PizzasEffects {

    constructor(private actions$: Actions) {}

    @Effect()
    loadPizzas$ = this.actions$.pipe(ofType())
}
