import {Component, OnInit} from "@angular/core";

@Component({
    selector: "m-ellipsis",
    templateUrl: "m-ellipsis.component.html"
})

export class MEllipsisComponent implements OnInit {

    private text: string;

    constructor() {
    }

    ngOnInit() {
    }

    getValue() {
        console.log("!!!change detection update!!!");
    }

}