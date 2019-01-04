import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

//myForOf - Of на конце это то что в item of items, of могу поменять на max и будет item max items
@Directive({
    selector: '[myFor][myForOf]'
})
export class MyForDirective {
    @Input()
    set myForOf(list) {
        this.view.clear();
        list.forEach((item, index) => {
            this.view.createEmbeddedView(this.template, {
                $implicit: item,
                index
            });
        });
    }

    constructor(private view: ViewContainerRef, private template: TemplateRef<any>) {
    }
}
