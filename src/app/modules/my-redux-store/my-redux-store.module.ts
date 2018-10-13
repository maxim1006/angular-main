import {NgModule} from '@angular/core';

import {MyReduxStoreComponent} from './my-redux-store.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";

const routes: Routes = [
    {path: '', component: MyReduxStoreComponent},
];


@NgModule({
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [],
    declarations: [MyReduxStoreComponent],
    providers: [],
})
export class MyReduxStoreModule {
}
