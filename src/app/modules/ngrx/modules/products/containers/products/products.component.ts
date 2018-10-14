import {Component, OnInit} from '@angular/core';

import {Pizza} from '../../models/pizza.model';
import {ProductsState} from "../../store/index";
import {Store} from "@ngrx/store";
import * as fromStore from "../../store";
import {Observable} from "rxjs/index";

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

    pizzas$: Observable<Pizza[]>;

    ngOnInit() {
        this.pizzas$ = this.store.select(fromStore.getAllPizzas);
    }
}
