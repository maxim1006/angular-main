//Форм билдер не сохраняет в форме дизейблд значения
//Встроенные валидаторы https://angular.io/api/forms/Validators

import {Component, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ayncNameValidator, dynamicFieldValidator, nameValidator} from './validators/validators';
import {ValidationConstants} from '../shared/constants/validation.constant';
import {switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {doOnSubscribe} from '../m-rxjs/components/rxjs-example/rxjs-example.component';

@Component({
    selector: 'm-form',
    templateUrl: './m-form.component.html'
})

export class MFormComponent implements OnInit {

    public myForm: FormGroup;
    public formModel: any = {};
    public service: string;

    /** @internal */
    public get _dynamicFields(): FormArray {
        return this.myForm.get('dynamicFields') as FormArray;
    }

    /** @internal */
    public _addField(): void {
        const control = new FormControl();

        control['customData'] = {
            customDataInControl: true
        };

        this._dynamicFields.push(control);
    }

    /** @internal */
    public _removeField(index: number): void {
        this._dynamicFields.removeAt(index);
    }

    /** @internal */
    public _resetForm(): void {
        this.myForm.reset();

        Object.keys(this.myForm.controls).forEach((name) => {
            this.myForm.controls[name].markAsUntouched();
        });

        while (this._dynamicFields.controls.length) {
            this._dynamicFields.removeAt(0);
        }
    }

    /** @internal */
    public _patchValue(): void {
        this.myForm.patchValue({
            name: 'Max',
            surname: 'Maximov'
        });
    }


    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        const self = this;

        self.service = 'testServ`ice';

        this.myForm = this.fb.group({
            'name': [
                //исходный value в input, нужно еще проставить disabled иначе приходит object, либо первым аргументом передавать не объект, а значение
                '',
                Validators.compose([Validators.required, Validators.maxLength(10), nameValidator()])
            ], //пример с кастомной валидацией
            'surname': [
                '',
                [Validators.required, Validators.maxLength(10)],
                [ayncNameValidator]
            ],
            'age': [
                ''
            ],
            'phone': ['',
                // disabled: false
                Validators.compose([Validators.pattern(ValidationConstants.PHONE_NUMBER)])
            ],
            'nested': this.fb.group({
                'email': ['',
                    // disabled: false
                    Validators.compose([Validators.pattern(ValidationConstants.EMAIL)])
                ],
            }),
            'dynamicFields': this.fb.array([])
        }, {
            validator: dynamicFieldValidator()
        });

        // listen control change
        // this.myForm.controls["name"].valueChanges.subscribe((value: string) => {
        //     console.log("name value changed to: ", value);
        // });

        // listen form change
        // this.myForm.valueChanges.subscribe((form: string) => {
        //     console.log("form changed to: ", form);
        // });

        // listen form change only fields that changed
        this.myForm.valueChanges.pipe(
            ngFormChanges(this.myForm)
        ).subscribe((form: SimpleChanges) => {
            console.log('form changed to: ', form);
        });

        // enable/disable controls
        // this.objectToArray(this.myForm.controls).map((control: any) => {
        //     if (state) {
        //         control.enable();
        //     } else {
        //         control.disable();
        //     }
        // });

        // Make touched/dirty
        // this.form.controls[i].markAsTouched();
        // this.form.controls[i].markAsDirty();

        // Default values  //https://angular.io/docs/ts/latest/api/forms/index/FormControl-class.html
        // setValue отличается от patchValue тем, что в setValue мы должны передавать (в случае если value - объект) - объект целиком со всеми свойствами, а patchValue достаточно только 1 свойство передать.
        // this.myForm.controls['name'].setValue('max', {});
        // this.myForm.controls['name'].markAsDirty();

        // console.log(this.myForm.controls['name']);

        //set values via form
        // this.myForm.setValue({
        //     name:    this.hero.name,
        //     address: this.hero.addresses[0] || new Address()
        // });

        // update all form
        // this.myForm.controls['date'].updateValueAndValidity();

    }

    onSubmit(value: string): void {
        console.log('submitted info: ', value);
        console.log('formModel: ', this.formModel);
    }

    public _getErrorText(controlName: string): string {
        let errorText = '',
            control = this.myForm.controls[controlName];

        if (control.errors) {
            if (control.errors['maxlength'] !== undefined) {
                errorText = `Value should be less then ${control.errors['maxlength'].requiredLength}`;
            }

            if (control.errors['nameValidation'] !== undefined) {
                errorText = `Should start with capital letter`;
            }

            if (control.errors['ayncNameValidation'] !== undefined) {
                errorText = `Async validation: should start with capital letter`;
            }
        }

        return errorText;
    }

    public enableControl(control: FormControl) {
        control.enable();
    }

    public disableControl(control: FormControl) {
        control.disable();
    }
}


// export function ngFormChanges(form: FormGroup) {
export const ngFormChanges = (form: FormGroup): (source: Observable<SimpleChanges>) => Observable<SimpleChanges> =>
    (source: Observable<SimpleChanges>): Observable<SimpleChanges> => {

        let prevValue;

        return source.pipe(
            doOnSubscribe(() => prevValue = form.value),
            switchMap((value) => {

                const changes = {};

                Object.keys(value).forEach(key => {
                    if (prevValue[key] !== value[key]) {
                        changes[key] = new SimpleChange(prevValue[key], value[key], false);
                    }
                });

                prevValue = value;

                return of(changes);
            })
        );
    };
