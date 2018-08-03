import {Component, OnInit, AfterViewInit, ElementRef} from "@angular/core";

@Component({
    selector: "el-native-element",
    templateUrl: "./el-native-element.component.html"
})

export class ElNativeElementComponent implements OnInit, AfterViewInit  {

    public constructor(private el:ElementRef) {}

    public ngOnInit() {
        console.log(this.el); //тоже сработает
    }

    public ngAfterViewInit() {
        console.log(this.el.nativeElement);
    }

}

