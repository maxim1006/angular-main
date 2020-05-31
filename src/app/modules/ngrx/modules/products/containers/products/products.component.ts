import { Component, OnInit } from "@angular/core";

import { Pizza } from "@models/pizza.model";
import { select, Store } from "@ngrx/store";
import * as fromStore from "../../store";
import { ProductsState } from "../../store/reducers";
import { Observable, of } from "rxjs";
import { catchError, delay, filter, switchMap, timeout } from "rxjs/operators";

@Component({
    selector: "products",
    styleUrls: ["products.component.less"],
    template: `
        <div class="products">
            <div class="products__new">
                <a class="btn btn__ok" routerLink="./new">
                    New Pizza
                </a>
            </div>
            <div class="products__list">
                <div *ngIf="!(pizzas$ | async)?.length">
                    No pizzas, add one to get started.
                </div>
                <pizza-item
                    *ngFor="let pizza of pizzas$ | async"
                    [pizza]="pizza"
                >
                </pizza-item>
            </div>
        </div>
    `,
})
export class ProductsComponent implements OnInit {
    pizzas: Pizza[];

    constructor(private store: Store<ProductsState>) {}

    pizzas$: Observable<{ [id: number]: Pizza }> = this.store.pipe(
        select(fromStore.getAllPizzas)
    );

    ngOnInit() {
        // вместо диспатча тут делаю это в guards, для инит загрузки всех пиц, отдельной пиццы и новой
        // this.store.dispatch(new fromStore.LoadToppingsAction());
    }
}
