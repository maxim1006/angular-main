import { Component, OnInit } from "@angular/core";

@Component({
    selector: "m-ellipsis",
    templateUrl: "m-ellipsis.component.html",
})
export class MEllipsisComponent {
    private text: string;

    getValue() {
        console.log("!!!change detection update!!!");
    }
}
