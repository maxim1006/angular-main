import { Component, OnInit, Input, TemplateRef } from "@angular/core";

@Component({
    selector: "outside-dynamic-template",
    templateUrl: "outside-dynamic-template.component.html",
})
export class OutsideDynamicTemplateComponent {
    @Input() inputTemplate: TemplateRef<any>;

    /** @Internal */
    public _prop = "default prop";

    ngAfterViewInit() {
        console.log("this.inputTemplate ", this.inputTemplate);
    }
}
