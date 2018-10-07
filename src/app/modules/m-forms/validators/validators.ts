import {AbstractControl, FormControl, ValidatorFn} from "@angular/forms";
import {of} from "rxjs/index";
import {delay, map, tap, timeout} from "rxjs/internal/operators";

let asyncPreviousName= '';

export function nameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const controlValue = control.value;
        const forbidden = controlValue && controlValue.charAt(0) === controlValue.toLowerCase().charAt(0);
        return forbidden ? {'nameValidation': true} : null;
    };
}

export function dynamicFieldValidator(): ValidatorFn {
    // проверяю если добавлен динамический компонент
    // return (control: AbstractControl): { [key: string]: any } | null => {
    //     const length = control.get("dynamicFields")["length"];
    //     return length === 0 ? {'dynamicFieldValidation': true} : null;
    // };

    return null;
}

//async validator example
export function ayncNameValidator(control: FormControl) {
    return of(control.value).pipe(delay(2000), map((value: string) => {
        return value.charAt(0) === value.toLowerCase().charAt(0) ?
            {ayncNameValidation: true} : null;
    }));
}
