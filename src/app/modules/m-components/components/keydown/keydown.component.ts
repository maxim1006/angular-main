import { Component } from "@angular/core";

@Component({
    selector: "m-keydown",
    template: ` <input type="text" #input (keydown)="_keydown($event)" /> `,
})
export class KeydownComponent {
    _keydown(event: KeyboardEvent) {
        if (event.defaultPrevented) {
            return; // Do nothing if the event was already processed
        }

        const key = event.key || event.keyCode;

        switch (key) {
            case "Down": // IE/Edge specific value
            case "ArrowDown":
            case 40:
                console.log(key);
                break;
            case "Up": // IE/Edge specific value
            case "ArrowUp":
            case 38:
                console.log(key);
                break;
            case "Left": // IE/Edge specific value
            case "ArrowLeft":
            case 37:
                console.log(key);
                break;
            case "Right": // IE/Edge specific value
            case "ArrowRight":
            case 39:
                console.log(key);
                break;
            case "Enter":
            case 13:
                console.log(key);
                break;
            case "Esc": // IE/Edge specific value
            case "Escape":
            case 27:
                console.log(key);
                break;
            default:
                console.log(key);
                return;
        }

        console.log("event.code", event.code);

        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
    }
}
