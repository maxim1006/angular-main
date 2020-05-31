import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "m-dynamic-app",
    templateUrl: "./dynamic-app.component.html",
    styleUrls: ["./dynamic-app.component.less"],
})
export class MDynamicAppComponent {
    @Input()
    public text: string;
}
