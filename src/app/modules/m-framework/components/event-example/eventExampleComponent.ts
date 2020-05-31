import { Component } from "@angular/core";

@Component({
    selector: "event-example",
    templateUrl: "./eventExampleComponent.html",
})
export class EventExampleComponent {
    public inputValue = "";

    public onButtonClick(element, value, event): void {
        // eslint-disable-next-line prefer-rest-params
        console.log(arguments);
    }

    public onInput(value) {
        console.log(value);
    }

    //this.dateInput.nativeElement.blur(); - кастомный эвент на элементе
}
