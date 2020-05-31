import { NgModule } from "@angular/core";

import { MNgrxComponent } from "./ngrx.component";
import { SharedModule } from "../shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { ActionReducer, MetaReducer, StoreModule } from "@ngrx/store";
import { MNgrxEffectsComponent } from "./components/ngrx-effects.component";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { storeFreeze } from "ngrx-store-freeze";
import { environment } from "../../../environments/environment";
import { reducers, effects, CustomSerializer } from "./store";
import {
    RouterStateSerializer,
    StoreRouterConnectingModule,
} from "@ngrx/router-store";
import { MFamilyService } from "./services/family.service";

// console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
    return function (state, action) {
        console.log("state", state);
        console.log("action", action);

        const newState = reducer(state, action);

        console.log("newState", newState);

        return newState;
    };
}

export const metaReducers: MetaReducer<any>[] = !environment.production
    ? [storeFreeze, debug]
    : [];

const routes: Routes = [
    {
        path: "",
        component: MNgrxComponent,
        // children: [
        //     {
        //         path: 'products',
        //         loadChildren: () => import('./modules/products/products.module').then(m => m.ProductsModule),
        //     },
        // ]
    },
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        // в данном случае это типо апп стор
        StoreModule.forRoot(
            {
                ...reducers,
            },
            { metaReducers }
            // могу задать initial state
            // {initialState: {
            //     counter: 0
            // }}
        ),
        StoreRouterConnectingModule.forRoot(),
        EffectsModule.forRoot(effects),
        StoreDevtoolsModule.instrument({
            name: "NgRx App",
            maxAge: 25,
            logOnly: environment.production,
        }),
    ],
    exports: [],
    declarations: [MNgrxComponent, MNgrxEffectsComponent],
    providers: [
        MFamilyService,
        {
            provide: RouterStateSerializer,
            useClass: CustomSerializer,
        },
    ],
})
export class MNgrxModule {}
