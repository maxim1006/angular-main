import {Component, OnInit} from '@angular/core';

import {Pizza} from '../../models/pizza.model';
import {select, Store} from '@ngrx/store';
import * as fromStore from "../../store";
import {Observable} from "rxjs/index";
import {ProductsState} from "../../store/reducers";
import {LoadPizzasAction} from '../../store';

@Component({
    selector: 'products',
    styleUrls: ['products.component.less'],
    template: `
        <div class="products">
            <div class="products__new">
                <a
                    class="btn btn__ok"
                    routerLink="./new">
                    New Pizza
                </a>
            </div>
            <div class="products__list">
                <div *ngIf="!((pizzas$ | async)?.length)">
                    No pizzas, add one to get started.
                </div>
                <pizza-item
                    *ngFor="let pizza of (pizzas$ | async)"
                    [pizza]="pizza">
                </pizza-item>
            </div>
        </div>
    `,
})
export class ProductsComponent implements OnInit {
    pizzas: Pizza[];

    constructor(private store: Store<ProductsState>) {
    }

    pizzas$: Observable<{[id: number]: Pizza}>;

    ngOnInit() {
        this.pizzas$ = this.store.pipe(select(fromStore.getAllPizzas));
        this.store.dispatch(new LoadPizzasAction());
    }
}
