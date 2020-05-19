import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';

import {Pizza} from '@models/pizza.model';

import {Topping} from '@models/topping.model';
import {select, Store} from '@ngrx/store';
import * as fromStore from '../../store';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {CreatePizzaAction} from '../../store';
import {isPlatformBrowser} from '@angular/common';

@Component({
    selector: 'product-item',
    styleUrls: ['product-item.component.less'],
    template: `
        <div
            class="product-item">
            <pizza-form
                [pizza]="pizza$ | async"
                [toppings]="toppings$ | async"
                (selected)="onSelect($event)"
                (create)="onCreate($event)"
                (update)="onUpdate($event)"
                (remove)="onRemove($event)">
                <pizza-display
                    [pizza]="visualise$ | async">
                </pizza-display>
            </pizza-form>
        </div>
    `,
})
export class ProductItemComponent implements OnInit {
    pizza$: Observable<Pizza>;
    visualise$: Observable<Pizza>;
    toppings$: Observable<Topping[]>;

    constructor(private store: Store<fromStore.ProductsState>, @Inject(PLATFORM_ID) private platformId: Object) {
    }

    ngOnInit() {
        this.pizza$ = this.store.pipe(select(fromStore.getSelectedPizza))
            .pipe(tap((pizza: Pizza = null) => {
                let toppings = [];

                if (pizza && pizza.toppings) {
                    toppings = pizza.toppings.map(topping => topping.id);
                }

                this.store.dispatch(new fromStore.VisualiseToppingsAction(toppings));
            }));

        this.toppings$ = this.store.pipe(select(fromStore.getAllToppings));
        this.visualise$ = this.store.pipe(select(fromStore.getPizzaVisualised));


        // this.pizzaService.getPizzas().subscribe(pizzas => {
        //   const param = this.route.snapshot.params.id;
        //   let pizza;
        //   if (param === 'new') {
        //     pizza = {};
        //   } else {
        //     pizza = pizzas.find(pizza => pizza.id == parseInt(param, 10));
        //   }
        //   this.pizza = pizza;
        //   this.toppingsService.getToppings().subscribe(toppings => {
        //     this.toppings = toppings;
        //     this.onSelect(toppings.map(topping => topping.id));
        //   });
        // });
    }

    onSelect(event: number[]) {
        this.store.dispatch(new fromStore.VisualiseToppingsAction(event));
        // let toppings;
        // if (this.toppings && this.toppings.length) {
        //   toppings = event.map(id =>
        //     this.toppings.find(topping => topping.id === id)
        //   );
        // } else {
        //   toppings = this.pizza.toppings;
        // }
        // this.visualise = { ...this.pizza, toppings };
    }

    onCreate(event: Pizza) {
        this.store.dispatch(new fromStore.CreatePizzaAction(event));
        // this.pizzaService.createPizza(event).subscribe(pizza => {
        //   this.router.navigate([`/ngrx/products`]);
        // });
    }

    onUpdate(event: Pizza) {
        this.store.dispatch(new fromStore.UpdatePizzaAction(event));
        // this.pizzaService.updatePizza(event).subscribe(() => {
        //   this.router.navigate([`/ngrx/products`]);
        // });
    }

    onRemove(event: Pizza) {
        if (isPlatformBrowser(this.platformId)) {
            const remove = window.confirm('Are you sure?');
            if (remove) {
                this.store.dispatch(new fromStore.RemovePizzaAction(event));
                // this.pizzaService.removePizza(event).subscribe(() => {
                //   this.router.navigate([`/ngrx/products`]);
                // });
            }
        }
    }
}
