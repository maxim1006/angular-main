import {Component, OnInit, Input} from '@angular/core';
import {decorator, decorator1, logProperty, logProperty1, PropertyHandler} from "./decorators";

@Component({
    selector: 'm-decorators',
    templateUrl: 'm-decorators.component.html'
})

export class MDecoratorsComponent implements OnInit {
    @PropertyHandler({
        beforeChange,
        afterChange
    })
    @logProperty1()
    @logProperty
    @Input()
    a: number;

    constructor() {}

    // @decorator()
    // @decorator1
    // private method() {
    //     console.log(this.a, ` method is triggered`);
    // }

    ngOnInit() {
        // this.method();
        this.a = 2;

        setTimeout(() => {
            this.a = 4;
        });
    }
}

function beforeChange (newValue, oldValue) {
    console.log("beforeChange newValue ", newValue);
    console.log("beforeChange oldValue ", oldValue);
}

function afterChange (newValue, oldValue) {
    console.log("afterChange newValue ", newValue);
    console.log("afterChange oldValue ", oldValue);
}
