import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

const routes: Routes = [{ path: "", component: AuthComponent }];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        HttpClientModule,
    ],
    exports: [],
    declarations: [AuthComponent],
    providers: [],
})
export class AuthModule {}
