import {Injectable} from '@angular/core';
import * as fromStore from "../store";
import {select, Store} from "@ngrx/store";
import {ActivatedRouteSnapshot, CanActivate} from "@angular/router";
import {Observable} from "rxjs";
import {filter, map, switchMap, take, tap} from "rxjs/operators";
import {Pizza} from "@models/pizza.model";

@Injectable()
export class PizzaExistsGuard implements CanActivate {

    constructor(private store: Store<fromStore.ProductsState>) {
    }

    public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => {
                const id = parseInt(route.params.pizzaId, 10);
                return this.hasPizza(id);
            })
        );
    }

    public hasPizza(id: number): Observable<boolean> {
        return this.store.pipe(
            select(
                fromStore.getPizzaEntities),
                map((entities: { [key: number]: Pizza }) => !!entities[id]),
                take(1)
        )
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
