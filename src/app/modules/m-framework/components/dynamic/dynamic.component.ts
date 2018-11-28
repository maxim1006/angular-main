import {
    Component, ComponentFactoryResolver, ComponentRef, ElementRef, EmbeddedViewRef, ViewChild,
    ViewContainerRef
} from "@angular/core";
import {ClassExampleComponent} from "../class-example/classExampleComponent";
import {MDirectiveExampleComponent} from "../directive-example/directive-example.component";
import {DynamicHostDirective} from "./dynamic-host.directive";


@Component({
    selector: 'dynamic-component',
    template: `
        <div #viewFromSomeDiv class="some-div-view-container"></div>
        
        <div #viewFromSomeDivElementRef class="some-div-element-container"></div>
        
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

    @ViewChild("viewFromSomeDivElementRef") viewFromSomeDivElementRef: ElementRef;

    @ViewChild(DynamicHostDirective) host: DynamicHostDirective;

    private contentEmbeddedView: EmbeddedViewRef<any>;

    /** @internal */
    // 3ий способ через ngComponentOutlet
    public _dynamicComponentClass:any = MDirectiveExampleComponent;

    private _componentRef: ComponentRef<any>;
    private _componentRefInstance: ClassExampleComponent;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private view: ViewContainerRef
    ) {}

    public ngOnInit() {
        // первый способ - забираю ng-template и использую его, могу вставить сразу в вью, также возможно, сделать
        // как в afterViewInit, те после того как отренедрил во вью компонента, сделать appendChild в нужное место
        this.contentEmbeddedView = this.view.createEmbeddedView(this.template, {$implicit: {prop: "createEmbeddedView prop"}});

        // второй способ
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ClassExampleComponent);

        this._componentRef = this.view.createComponent(componentFactory);

        // так получаю инстанс компоненты
        this._componentRefInstance = this._componentRef.instance;
        // так задаю ей свойство
        this._componentRefInstance.prop = "new prop";
        // так получаю nativeElement компоненты и ее можно куда-нибудь зааппендить
        console.log("this._componentRef.location.nativeElement ", this._componentRef.location.nativeElement);

        let dynamicComponentFromSomeDiv = this.viewFromSomeDiv.createComponent(componentFactory);

        console.log("dynamicComponentFromSomeDiv.instance ", dynamicComponentFromSomeDiv.instance); // могу у него менять проперти и делать subscribe на эвент эмиттер

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

    ngAfterViewInit() {
        // Продолжение из пункта 1, использую кастомный див (some-div-element-container) в качестве viewFromSomeDivElementRef, при этом переаппенжу в этот див из вью компоненты, если бы не было этих строк, то
        // отрендерилось бы во вью компоненты
        // for (let node of this.contentEmbeddedView.rootNodes) {
        //     if (node) {
        //         this.viewFromSomeDivElementRef.nativeElement.appendChild(node);
        //     }
        // }
    }

    ngOnDestroy() {
        if (this._componentRef) {
            this._componentRef.destroy();
        }
    }
}
