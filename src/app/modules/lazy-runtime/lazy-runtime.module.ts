import { NgModule } from "@angular/core";

import { LazyRuntimeComponent } from "./lazy-runtime.component";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [CommonModule],
    exports: [],
    declarations: [LazyRuntimeComponent],
    bootstrap: [LazyRuntimeComponent],
    entryComponents: [LazyRuntimeComponent],
})
export class LazyRuntimeModule {}
