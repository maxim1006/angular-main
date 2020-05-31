import { NgModule } from "@angular/core";

import { MReduxComponent } from "./redux.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [{ path: "", component: MReduxComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [],
    declarations: [MReduxComponent],
    providers: [],
})
export class MReduxModule {}
