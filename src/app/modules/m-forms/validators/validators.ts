import {FormControl} from "@angular/forms";

let previousName= '';

//async validator example
export function nameValidator(control: FormControl) {

    let self = this;

    let promise = new Promise((resolve, reject) => {

        let controlValue = typeof control.value === 'string' ? control.value : control.value.value;

        console.log(controlValue, " controlValue");

        if (!control.value || previousName === controlValue) {
            console.log(control.value, "name control value");
            return resolve();
        }

        setTimeout(() => {

            if (controlValue && controlValue.charAt(0) === controlValue.toLocaleLowerCase().charAt(0)) {
                resolve({invalidName: true});
            } else {
                resolve({invalidName: false});
            }

            console.log(self, "async name validation end");
        }, 2000);

        previousName = controlValue;

    });



    return promise;
}