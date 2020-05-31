import { Directive, Input, TemplateRef } from "@angular/core";

@Directive({
    selector: "[transclude]",
})
export class TranscludeDirective {
    @Input()
    public transclude: any;

    constructor(private templateRef: TemplateRef<void>) {}

    ngOnInit() {
        if (this.transclude) {
            console.log("this.templateRef ", this.templateRef);
            this.transclude["template"] = this.templateRef;
        }
    }
}
