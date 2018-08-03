import {NgModule} from '@angular/core';

import {MNgrxComponent} from './ngrx.component';
import {SharedModule} from "../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {StoreModule} from "@ngrx/store";
import {counterReducer} from "./store/reducers/counter.reducer";
import {MNgrxEffectsComponent} from "./components/ngrx-effects.component";
import {familyReducer} from "./store/reducers/family.reducer";
import {EffectsModule} from "@ngrx/effects";
import {FamilyEffect} from "./store/effects/family.effect";




const routes: Routes = [
    {path: '', component: MNgrxComponent},
];




@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        StoreModule.forRoot(
    {
                counter: counterReducer,
                family: familyReducer
            },
            // могу задать initial state
            // {initialState: {
            //     counter: 0
            // }}
        ),
        EffectsModule.forRoot([FamilyEffect])
    ],
    exports: [],
    declarations: [
        MNgrxComponent,
        MNgrxEffectsComponent
    ],
    providers: [],
})
export class MNgrxModule {
}
