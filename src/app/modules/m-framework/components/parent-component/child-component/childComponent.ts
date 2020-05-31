import {
    Component,
    Input,
    EventEmitter,
    Output,
    OnInit,
    OnDestroy,
} from "@angular/core";
import { ParentComponentService } from "../parent-component.service";
import { Subscription } from "rxjs";

@Component({
    selector: "child-component",
    templateUrl: "./childComponent.html",
})
export class ChildComponent implements OnInit, OnDestroy {
    childComponentModel = "";

    @Input()
    valueFromParent: any;

    @Output()
    valueFromParentChange: EventEmitter<any> = new EventEmitter();

    @Input()
    public inputValue: string;

    @Input()
    public functionInput: Function;

    @Output()
    onClickOutput: EventEmitter<string> = new EventEmitter();
    private subscription: Subscription;

    constructor(private parentComponentService: ParentComponentService) {
        console.log("child constructor");
    }

    ngOnInit() {
        this.subscription = this.parentComponentService.serviceProp$.subscribe(
            value => {
                console.log(value);
            }
        );

        if (this.functionInput) {
            this.functionInput("functionInput text");
        }

        console.log("child ngOnInit");
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        console.log("child ngOnDestroy");
    }

    getProp() {
        this.parentComponentService.getProp();
    }

    public onClick(): void {
        this.onClickOutput.emit(this.inputValue);
    }

    public start() {
        console.log("child component start");
    }

    public stop() {
        console.log("child component stop");
    }

    public valueChange(data: string) {
        console.log(data, "data from child component input");
    }

    public onCheckboxValueChange(event: Event) {
        // console.dir(event);
        this.valueFromParent.arr[0].checked = event.srcElement["checked"];
        // console.dir(this.valueFromParent);
        this.valueFromParentChange.emit(this.valueFromParent);
    }

    public ngAfterViewInit() {
        console.log("child ngAfterViewInit");
    }
}
