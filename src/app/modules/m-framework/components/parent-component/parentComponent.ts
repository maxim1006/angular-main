import {Component, ViewChild, OnInit, ElementRef, ViewChildren, QueryList} from "@angular/core";
import {ChildComponent} from "./child-component/childComponent";
import {ParentComponentService} from "./parent-component.service";

@Component({
    selector: "parent-component",
    templateUrl: "./parentComponent.html",
    providers: [ParentComponentService]
})

export class ParentComponent implements OnInit {
    _parentValue: any;

    public inputValue: string;
    public inputValueFromInnerComponent: string;

    public set parentValue(value) {
        console.log('parentValue', value);
        this._parentValue = value;
    }

    public get parentValue() {
        return this._parentValue;
    }

    constructor() {
        console.log("parent constructor");
    }

    ngOnInit() {
        this.parentValue = {
            arr: [
                {
                    checked: true
                }
            ]
        };

        console.log(this.childComponent, ' this.childComponent');
        console.log("parent ngOnInit");
    }

    //так могу находить любой компонент в темплейте и дергать его апи, тоже самое, что и с #child, только с локальной переменной я могу это сделать только в шаблоне, а так могу и в контроллере
    //@ViewChild('child', {read: ElementRef}) //если кастомный элемент, то пишу так, чтобы получить его дом элемент, даже п
    @ViewChild('child')
    private childComponent: ChildComponent;

    @ViewChild('child', {read: ElementRef})
    private childComponentElementRef: ChildComponent;

    @ViewChildren("button")
    private buttonsList: QueryList<HTMLElement>;

    @ViewChildren(ChildComponent)
    private childComponentList: QueryList<ChildComponent>;

    ngAfterViewInit() {
        console.log("this.childComponent ", this.childComponent);
        console.log("this.childComponentElementRef ", this.childComponentElementRef);
        console.log("childComponentList ", this.childComponentList);
        console.log("buttonsList ", this.buttonsList.toArray());
        console.log("parent ngAfterViewInit");
    }

    public childStart() {
        this.childComponent.getProp();
        this.childComponent.start();
    }

    public childStop() {
        this.childComponent.stop();
    }

    public functionForChild(message: string): void {
        console.log(message);
    }

    public ngOnDestroy() {
        console.log("parent ngOnDestroy");
    }
}
