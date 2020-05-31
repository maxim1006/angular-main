import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
    selector: "m-output-listeners",
    templateUrl: "./output-listeners.component.html",
    styleUrls: ["./output-listeners.component.less"],
})
export class OutputListenersComponent implements OnInit {
    @Output()
    outputListener: EventEmitter<void> = new EventEmitter();

    outputListenersLength: number;

    ngOnInit() {
        this.outputListenersLength = this.outputListener.observers.length;
    }
}
