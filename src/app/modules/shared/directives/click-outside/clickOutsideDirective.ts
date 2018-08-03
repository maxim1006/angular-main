import {Directive, HostListener, HostBinding, Output, EventEmitter, ElementRef} from '@angular/core';

@Directive({
    selector: '[click-outside]'

//    также селектор может быть
//     selector: "a" - это будут все ссылки
//     exportAs: "aHref" - так можно будет обратиться к этой директиве, см. пример с формами
})

export class ClickOutsideDirective {

    @Output()
    public clickOutside = new EventEmitter();

    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement) {
        if (!this._el.nativeElement.contains(event.target)) {  
            console.log(targetElement, ' ++++++++++');
        }
    }

    constructor(private _el: ElementRef) {}
}