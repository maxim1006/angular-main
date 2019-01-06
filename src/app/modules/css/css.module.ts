import {NgModule} from '@angular/core';

import {CssComponent} from './css.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";

const routes: Routes = [
    {path: '', component: CssComponent},
];

@NgModule({
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [],
    declarations: [CssComponent],
    providers: [],
})
export class CssModule {
}
