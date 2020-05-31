import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { TField } from "./components/t-field/t-field.component";
import { MFormComponent } from "./m-form.component";
import { SharedModule } from "../shared/shared.module";
import { MFormControlComponent } from "./components/form-control/form-control.component";

@NgModule({
    imports: [SharedModule, ReactiveFormsModule],
    declarations: [MFormComponent, TField, MFormControlComponent],
    exports: [MFormComponent],
    providers: [],
})
export class MFormsModule {}
