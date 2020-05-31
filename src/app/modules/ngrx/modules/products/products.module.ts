import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
// components
import * as fromComponents from "./components";
// containers
import * as fromContainers from "./containers";
// guards
import * as fromGuards from "./guards";
// services
import * as fromServices from "./services";
import { StoreModule } from "@ngrx/store";
import { effects, productsReducers } from "./store";
import { EffectsModule } from "@ngrx/effects";

// routes
export const ROUTES: Routes = [
    {
        path: "",
        canActivate: [fromGuards.PizzasGuard],
        component: fromContainers.ProductsComponent,
    },
    {
        path: "new",
        canActivate: [fromGuards.PizzasGuard, fromGuards.PizzaToppingsGuard],
        component: fromContainers.ProductItemComponent,
    },
    {
        path: ":pizzaId",
        canActivate: [
            fromGuards.PizzaExistsGuard,
            fromGuards.PizzaToppingsGuard,
        ],
        component: fromContainers.ProductItemComponent,
    },
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forChild(ROUTES),
        // forFeature использую для лезийных модулей, свой кусок стора этот модуль добавит к общему
        StoreModule.forFeature("products", productsReducers),
        EffectsModule.forFeature(effects),
    ],
    providers: [...fromServices.services, ...fromGuards.guards],
    declarations: [...fromContainers.containers, ...fromComponents.components],
    exports: [...fromContainers.containers, ...fromComponents.components],
})
export class ProductsModule {}
