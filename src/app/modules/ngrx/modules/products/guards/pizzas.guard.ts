import * as fromStore from "../store";

import {Injectable} from '@angular/core';
import {CanActivate} from "@angular/router";
import {Observable, of} from "rxjs";
import {select, Store} from "@ngrx/store";
import {filter, tap, take} from "rxjs/operators";
import {catchError, switchMap} from "rxjs/internal/operators";

@Injectable()
export class PizzasGuard implements CanActivate {

    constructor(private store: Store<fromStore.ProductsState>) {}

    public canActivate(): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(_ => of(true)),
            catchError(_ => of(false))
        );
    }

    public checkStore(): Observable<boolean> {
        return this.store.pipe(
            select(fromStore.getPizzasLoaded),
            tap((loaded) => {
                if (!loaded) {
                    this.store.dispatch(new fromStore.LoadPizzasAction())
                }
            }),
            filter(loaded => loaded),
            take(1)
        )
    }
}
