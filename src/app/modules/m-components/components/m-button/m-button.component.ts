import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: "m-button",
    templateUrl: "m-button.component.html",
})
export class MButtonComponent {
    @Input() styleClass: string;
    @Input() text: string;
    @Input() disabled: boolean;
    @Input() id: string;

    @Output()
    onClick = new EventEmitter();

    onButtonClick(event: MouseEvent) {
        this.onClick.emit(event);
        console.log("button is clicked");
    }
}
