import { Component, OnInit } from "@angular/core";

@Component({
    selector: "m-console-examples",
    templateUrl: "./console-examples.component.html",
    styleUrls: ["./console-examples.component.less"],
})
export class ConsoleExamplesComponent implements OnInit {
    ngOnInit() {
        console.clear();
        // eslint-disable-next-line no-restricted-syntax
        console.trace("console.trace");
        // eslint-disable-next-line no-restricted-syntax
        console.time("console.time");
        // eslint-disable-next-line no-restricted-syntax
        console.timeEnd("console.time");
        console.profile("counter");
        console.profileEnd("counter");
        console.log(console.memory);
        console.log(performance.now()); // ms
    }
}
