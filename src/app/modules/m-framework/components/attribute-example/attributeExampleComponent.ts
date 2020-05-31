import { Component } from "@angular/core";

@Component({
    selector: "attribute-example",
    templateUrl: "./attributeExampleComponent.html",
})
export class AttributeExampleComponent {
    getAttributes() {
        return {
            title: "button",
            disabled: true,
        };
    }
}
