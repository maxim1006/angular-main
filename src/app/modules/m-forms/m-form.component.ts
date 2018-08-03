//Форм билдер не сохраняет в форме дизейблд значения
//Встроенные валидаторы https://angular.io/api/forms/Validators

import {Component, OnInit, ViewChild} from "@angular/core";
import {FormBuilder, FormGroup, Validators, AbstractControl, FormControl, NgForm} from "@angular/forms";
import {nameValidator} from "./validators/validators";
import {ValidationConstants} from "../shared/constants/validation.constant";

@Component({
    selector: "m-form",
    templateUrl: "./m-form.component.html"
})

export class MFormComponent implements OnInit {

    //так могу получить любую форму
    @ViewChild("myNgForm")
    myNgForm: NgForm;

    public myForm: FormGroup;
    public formModel: any = {};
    public service: string;

    constructor(fb: FormBuilder) {
        let self = this;

        self.service = "testService";

        this.myForm = fb.group({
            'name': new FormControl(
                {
                    //исходный value в input, нужно еще проставить disabled иначе приходит object, либо первым аргументом передавать не объект, а значение
                    value: "Max",
                    //disable state
                    disabled: false
                },
                Validators.compose([Validators.required, Validators.maxLength(10)]),
                nameValidator.bind(self)
            ), //пример с кастомной валидацией
            'surname': new FormControl(
                "Maximov",
                Validators.compose([Validators.required, nameValidator, Validators.maxLength(10)])
            ),
            'phone': new FormControl(
                {
                    value: null,
                    // disabled: false
                },
                Validators.compose([Validators.pattern(ValidationConstants.PHONE_NUMBER)])
            ),
            'email': new FormControl(
                {
                    value: null,
                    // disabled: false
                },
                Validators.compose([Validators.required, Validators.pattern(ValidationConstants.EMAIL)])
            ),
            'customFormControl': new FormControl(
                null,
                Validators.compose([Validators.required])
            )
        });

        this.myForm.controls["name"].valueChanges.subscribe((value: string) => {
            console.log("name value changed to: ", value);
        });

        this.myForm.valueChanges.subscribe((form: string) => {
            console.log("form changed to: ", form);
        });

        //reset form
        // setTimeout(() => {
        //     //reset form
        //     this.myForm.reset({
        //         name: "Max"
        //     });
        // }, 3000)

        //enable/disable controls
        // this.objectToArray(this.myForm.controls).map((control: any) => {
        //     if (state) {
        //         control.enable();
        //     } else {
        //         control.disable();
        //     }
        // });

        //Make touched/dirty
        // this.form.controls[i].markAsTouched();
        // this.form.controls[i].markAsDirty();

        // Default values  //https://angular.io/docs/ts/latest/api/forms/index/FormControl-class.html
        // this.myForm.controls['name'].setValue('max', {});
        // this.myForm.controls['name'].markAsDirty();

        console.log(this.myForm.controls['name']);

        //set values via form
        // this.myForm.setValue({
        //     name:    this.hero.name,
        //     address: this.hero.addresses[0] || new Address()
        // });

    }

    ngOnInit() {
    }

    onSubmit(value: string):void {
        console.log("submitted info: ", value);
        console.log("formModel: ", this.formModel);
    }

}
