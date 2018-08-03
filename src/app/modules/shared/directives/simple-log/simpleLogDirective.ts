import {Directive, HostListener, HostBinding} from '@angular/core';

@Directive({
    selector: '[simple-log]', //могу сделать к конкретному селектору selector: 'input[simple-log]'
    //можно хост, а можно и декораторы
    // host: { //на элемент с simple-log навешивается логика
    //     '(input)': 'onInput($event)',
    //     '[class._valid]': 'isValid'
    // }
})

export class SimpleLogDirective {

    @HostBinding('class._valid')//это тоже самое, что и '[class._valid]': 'isValid' в host
    public isValid:boolean;

    @HostListener('input', ['$event'])//это тоже самое, что и '(input)': 'onInput($event)' в host
    public onInput(e):void {
        let el = e.target as HTMLInputElement,  //assertion, те я понимаю, что это не просто таргет, а именно инпут элемент
            value = el.value;

        this.isValid = value === 'valid';

        console.log(el.value);
    }

}