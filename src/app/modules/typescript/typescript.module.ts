import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { HttpClientModule } from "@angular/common/http";
import { TypescriptComponent } from "./typescript.component";

const routes: Routes = [{ path: "", component: TypescriptComponent }];

@NgModule({
    declarations: [TypescriptComponent],
    imports: [SharedModule, HttpClientModule, RouterModule.forChild(routes)],
})
export class TypescriptModule {}
