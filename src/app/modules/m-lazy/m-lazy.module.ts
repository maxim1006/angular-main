import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {MLazyComponent} from "./m-lazy.component";
import {RouterModule, Routes} from "@angular/router";


const routes: Routes = [
    {path: '', component: MLazyComponent},
];


@NgModule({
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [MLazyComponent],
    declarations: [MLazyComponent]
})
export class MLazyModule {}


