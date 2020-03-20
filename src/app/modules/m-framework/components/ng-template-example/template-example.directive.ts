import {AfterViewInit, Directive, TemplateRef} from '@angular/core';

@Directive({
    selector: "[mTemplateExampleDirective]",
    exportAs: "mTemplateExampleDirective"
})
export class MTemplateExampleDirective implements AfterViewInit{
    constructor(public template: TemplateRef<any>) {
    }

    ngAfterViewInit() {
        console.log(this.template);
    }
}
