import { Component, OnInit, Directive, Input } from '@angular/core';

@Directive({
    selector: '[custom-directive]'
})
export class CustomDirective implements OnInit {
    @Input('custom-directive') options: any = {};

    private Input() {

    }

     ngOnInit() {
         console.log(this.options);
     }
}

@Component({
    selector: "component-with-directive",
    templateUrl: "./ComponentWithDirectiveComponent.html"
})
export class ComponentWithDirectiveComponent implements OnInit {

    public value: string = '';

    public options: any;

    public constructor() {}

    ngOnInit() {
        let prop2 = 2;

        this.options = {
            prop: 1,
            prop2
        }
    }

    items = [
        "Max",
        "Aliya",
        "Lili"
    ];
}
