import {Component, OnInit, Input, TemplateRef} from '@angular/core';

@Component({
    selector: 'outside-dynamic-template',
    templateUrl: 'outside-dynamic-template.component.html'
})

export class OutsideDynamicTemplateComponent implements OnInit {
    @Input() inputTemplate: TemplateRef<any>;

    /** @Internal */
    public _prop: string = "default prop";

    constructor() {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        console.log("this.inputTemplate ", this.inputTemplate);
    }
}