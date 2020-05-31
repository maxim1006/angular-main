import { Component, ViewChild, ViewChildren, ElementRef } from "@angular/core";

@Component({
    selector: "element-link",
    templateUrl: "./elementLinkComponent.html",
})
export class ElementLinkComponent {
    @ViewChild("myInput")
    input: ElementRef; //nativeElement - cвойство объекта ElementRef - который вернет декоратор

    @ViewChildren("inputItem")
    inputs;

    public inputValue = "";

    ngAfterViewInit() {
        this.getInputs();
    }

    public onButtonClick(element, value): void {
        console.log(element);
    }

    public getInput(): ElementRef {
        console.log(this.input.nativeElement);
        return this.input;
    }

    public getInputs() {
        //так получаю каждого чайлда
        this.inputs.forEach((element: ElementRef) => {
            console.log(element);
        });
        console.log(this.inputs._results);
        return this.inputs;
    }
}
