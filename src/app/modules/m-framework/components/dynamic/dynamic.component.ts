import {Component, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef} from "@angular/core";
import {ClassExampleComponent} from "../class-example/classExampleComponent";
import {MDirectiveExampleComponent} from "../directive-example/directive-example.component";
import {DynamicHostDirective} from "./dynamic-host.directive";


@Component({
    selector: 'dynamic-component',
    template: `
        <div #viewFromSomeDiv class="some-div-view-container"></div>
        
        <ng-template #tmpl let-options>
            
            Template createEmbeddedView with property: {{options?.prop}} 
            
        </ng-template>

        <h3>Вывожу динамический компонент 3ий способ</h3>
        <ng-container
            *ngComponentOutlet="_dynamicComponentClass;"
        ></ng-container>

        <h3>Вывожу динамический компонент через <i>dynamicHost</i> директиву</h3>
        <div dynamicHost></div>
    
    `
})
export class DynamicComponent {
    @ViewChild("tmpl")
    public template: any;

    @ViewChild("viewFromSomeDiv", {read: ViewContainerRef}) viewFromSomeDiv: ViewContainerRef;

    @ViewChild(DynamicHostDirective) host: DynamicHostDirective;

    /** @internal */
    // 3ий способ через ngComponentOutlet
    public _dynamicComponentClass:any = MDirectiveExampleComponent;

    private _componentRef: ComponentRef<any>;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private view: ViewContainerRef
    ) {}

    public ngOnInit() {
        // первый способ
        this.view.createEmbeddedView(this.template, {$implicit: {prop: "createEmbeddedView prop"}});

        // второй способ
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ClassExampleComponent);

        this._componentRef = this.view.createComponent(componentFactory);
        this.viewFromSomeDiv.createComponent(componentFactory);

        const data = {prop: "createComponent prop"};

        if (data) {
            Object.keys(data).forEach((key: string) => {
                (this._componentRef.instance)[key] = data[key];
            });
        }

        // 3ий способ через ngComponentOutlet
        setTimeout(() => {
            this._dynamicComponentClass = ClassExampleComponent;
        }, 3000);


        // 4ый способ через директиву host
        this.host.view.createComponent(componentFactory);

    }

    ngOnDestroy() {
        if (this._componentRef) {
            this._componentRef.destroy();
        }
    }
}
