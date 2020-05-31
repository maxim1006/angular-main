import { Component, HostBinding, OnInit } from "@angular/core";

@Component({
    selector: "m-grid-example",
    templateUrl: "./grid-example.component.html",
})
export class MGridExampleComponent {
    @HostBinding("class.m-grid-example")
    private hostClass = true;
}
