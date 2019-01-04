import * as RouterActions from '../actions/router.action';
import {Injectable} from '@angular/core';
import {Location} from '@angular/common';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {map, tap} from 'rxjs/operators';

@Injectable()
export class RouterEffects {

    constructor(
        private actions$: Actions,
        private router: Router,
        private location: Location
    ) {}

    @Effect({ dispatch: false })
    $navigate = this.actions$.pipe(
        ofType(RouterActions.RouterActionTypes.Go),
        map((action: RouterActions.Go) => action.payload),
        tap(({ path, query: queryParams, extras }) => {
            this.router.navigate(path, { queryParams, ...extras });
        })
    );

    @Effect({ dispatch: false })
    $navigateBack = this.actions$.pipe(
        ofType(RouterActions.RouterActionTypes.Back),
        tap(_ => this.location.back())
    );

    @Effect({ dispatch: false })
    $navigateForward = this.actions$.pipe(
        ofType(RouterActions.RouterActionTypes.Forward),
        tap(_ => this.location.forward())
    );

}
