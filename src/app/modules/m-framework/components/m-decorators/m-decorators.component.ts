import {Component, OnInit, Input} from '@angular/core';
import {decorator, decorator1, logProperty, logProperty1} from "./decorators";

@Component({
    selector: 'm-decorators',
    templateUrl: 'm-decorators.component.html'
})

export class MDecoratorsComponent implements OnInit {
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

    }
}


interface PropertyHandlers<T> {
    beforeChange?: { (newValue: T, oldValue: T): boolean | void },
    afterChange?: { (newValue: T, oldValue: T): void }
}



export function PropertyHandler<T>(handlers: PropertyHandlers<T>): PropertyDecorator {

    return (target: any, propertyKey: string): void => {

        let spoofPropertyKey = `__PropertyHandler_${propertyKey}_value`;

        let propertyDescriptor = {
            configurable: true,
            enumerable: false,
            get: function () {
                return this[spoofPropertyKey];
            },
            set: function (newValue: T) {
                let oldValue = this[spoofPropertyKey];
                if (newValue === oldValue) {
                    return;
                }
                if (handlers.beforeChange && handlers.beforeChange.call(this, newValue, oldValue) === false) {
                    return;
                }
                this[spoofPropertyKey] = newValue;
                if (handlers.afterChange) {
                    handlers.afterChange.call(this, newValue, oldValue);
                }
            }
        };

        Object.defineProperty(target, propertyKey, propertyDescriptor);
    };
}
