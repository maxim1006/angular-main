import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// useExisting: forwardRef(() => MFormControlComponent), //- делаю так если задаю класс после вызова, чтобы избежать ошибки компиляции

@Component({
    selector: 'm-form-control',
    templateUrl: './form-control.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: MFormControlComponent, // еще используется, чтобы выдать только методы, которые хотел
            multi: true
        }
    ]
})

export class MFormControlComponent implements ControlValueAccessor {
    public propagateChange: Function;
    public propagateTouch: Function;
    public currentValue: number;

    /** @internal */
    public _click(value: number, event: Event): void {
        this.currentValue = value;
        event.stopPropagation();
        this.propagateChange(this.currentValue);
        this.propagateTouch(this.currentValue);
    }

    public writeValue(value: number): void {
        this.currentValue = value;
    }

    public registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.propagateTouch = fn;
    }
}
