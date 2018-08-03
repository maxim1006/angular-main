import {Component} from '@angular/core';

@Component({
    selector: "event-example",
    templateUrl: "./eventExampleComponent.html"
})

export class EventExampleComponent {
    public inputValue = '';

    public constructor() {
    }

    public onButtonClick(element, value, event):void {
        console.log(arguments);
    }

    public onInput(value) {
        console.log(value);
    }

    //this.dateInput.nativeElement.blur(); - кастомный эвент на элементе
}
