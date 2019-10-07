import {Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AbstractControl, ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
        selector: 't-field',
        templateUrl: './t-field.component.html',
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: TField,
                multi: true
            }
        ]
})


export class TField implements ControlValueAccessor {

    @HostBinding('class.t-field')
    private hostClass = true;

    @HostBinding('class._disabled')
    private disabledState = false;

    @ViewChild('input', {static: false})
    private inputRef: ElementRef;

    @Output()
    public valueChange = new EventEmitter();

    @Input()
    public controlName: string;

    @Input()
    public set value(currentValue: any) {
        if (this._value !== currentValue) {
            this._value = currentValue;
            this.valueChange.emit(currentValue);
            this.propagateChange && this.propagateChange(currentValue);
            this.propagateChange && this.propagateTouch(currentValue);

            this.updateInputValue();
        }
    }

    public get value(): any {
        return this._value;
    }

    private _value: any;

    @Input()
    public autoComplete: string;

    @Input()
    public hint: string;

    @Input()
    public inputName: string;

    @Input()
    public disabled: boolean;

    @Input()
    public maxlength: number;

    @Input()
    public model: any;

    @Input()
    public isRequired: boolean;

    @Input()
    public placeholder = '';

    @Input()
    public inputStyleClass: string;

    @Input()
    public fieldLabel: string;

    @Input()
    public type = 'text';

    constructor() {}

    ngAfterViewInit() {
        this.updateInputValue();
    }

    public propagateChange: Function;
    public propagateTouch: Function;

    public registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.propagateTouch = fn;
    }

    public writeValue(value: any): void {
        this.value = value;
    }

    public onValueChange(event: any): void {
        this.value = event.target.value;
    }

    private updateInputValue(): void {
        if (this.inputRef && this.inputRef.nativeElement) {
            this.inputRef.nativeElement.value = this.value;
        }
    }

    public setDisabledState(isDisabled: boolean): void {
        this.disabledState = isDisabled;
    }

}
