import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {AbstractControl, FormGroup} from "@angular/forms";

@Component({
        selector: "t-field",
        templateUrl: "./t-field.component.html"
})


export class TField implements OnInit {

    @Output()
    public onControlChange = new EventEmitter();

    @Input()
    public controlName: string;

    @Input()
    public autoComplete: string;

    @Input()
    public hint: string;

    @Input()
    public disabled: boolean;

    @Input()
    public model: any;

    @Input()
    public isRequired: boolean;

    @Input()
    public placeholder: string = '';

    @Input()
    public inputStyleClass: string;

    @Input()
    public fieldLabel: string;

    @Input()
    public type: string = 'text';

    @Input()
    public form: FormGroup;

    public control: AbstractControl;

    constructor() {}

    ngOnInit() {
        this.control = this.form.get(this.controlName);
        console.log(this.control);
    }

    controlChange(value:any) {
        this.onControlChange.emit(value);
    }

}