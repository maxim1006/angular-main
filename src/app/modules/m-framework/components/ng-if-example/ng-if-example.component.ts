import { Component } from "@angular/core";
import { NgForExampleService } from "../ng-for-example/ng-for-example.service";

@Component({
    selector: "ng-if-example",
    templateUrl: "ng-if-example.html",
})
export class NgIfExampleComponent {
    public displayValue: string;

    condition = false;
    thenCondition = true;
}
