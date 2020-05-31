import { Component } from "@angular/core";

@Component({
    selector: "m-textarea-test",
    template: `
        <input type="text" #input (input)="textareaValue = input.value" />
        <textarea
            cols="30"
            rows="10"
            (input)="_input($event)"
            (change)="_change($event)"
            >{{ textareaValue }}</textarea
        >
    `,
    styleUrls: ["./textarea-test.component.less"],
})
export class TextareaTestComponent {
    textareaValue: string;

    _input($event) {
        console.log("input", $event);
    }

    _change($event) {
        console.log("change", $event);
    }
}
