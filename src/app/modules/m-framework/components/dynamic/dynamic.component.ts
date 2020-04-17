import {
    ApplicationRef, ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    ElementRef,
    EmbeddedViewRef,
    Injector,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {ClassExampleComponent} from '../class-example/classExampleComponent';
import {MDirectiveExampleComponent} from '../directive-example/directive-example.component';
import {DynamicHostDirective} from './dynamic-host.directive';


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
    @ViewChild('tmpl', {static: true})
    public template: any;

    @ViewChild('viewFromSomeDiv', { read: ViewContainerRef }) viewFromSomeDiv: ViewContainerRef;

    @ViewChild('viewFromSomeDivElementRef') viewFromSomeDivElementRef: ElementRef;

    @ViewChild(DynamicHostDirective) host: DynamicHostDirective;

    private contentEmbeddedView: EmbeddedViewRef<any>;

    /** @internal */
    // 3ий способ через ngComponentOutlet
    public _dynamicComponentClass: any = MDirectiveExampleComponent;

    private _componentRef: ComponentRef<any>;
    private _componentRefViaCreate: ComponentRef<any>;
    private _componentRefInstance: ClassExampleComponent;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private view: ViewContainerRef,
        private injector: Injector,
        private appRef: ApplicationRef,
        private cdr: ChangeDetectorRef
    ) {}

    public ngOnInit() {
        // первый способ - забираю ng-template и использую его, могу вставить сразу в вью, также возможно, сделать
        // как в afterViewInit, те после того как отренедрил во вью компонента, сделать appendChild в нужное место
        this.contentEmbeddedView = this.view.createEmbeddedView(this.template, {$implicit: {prop: 'createEmbeddedView prop'}});

        // второй способ
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ClassExampleComponent);

        // это тоже что и this._componentRef = componentFactory.create(this.injector);
        // только createComponent еще и вставляет в вью, а  с create еще нужно сделать
        // кастомно, смотри пример в ngAfterViewInit
        this._componentRef = this.view.createComponent(componentFactory);
        this._componentRef.onDestroy(() => console.log("_componentRef destroyed"));

        // так получаю инстанс компоненты
        this._componentRefInstance = this._componentRef.instance;
        // так задаю ей свойство
        // this._componentRefInstance.prop = "new prop";
        // так получаю nativeElement компоненты и ее можно куда-нибудь зааппендить
        // console.log("this._componentRef.location.nativeElement ", this._componentRef.location.nativeElement);

        // let dynamicComponentRefFromSomeDiv = this.viewFromSomeDiv.createComponent(componentFactory);
        //
        // console.log("dynamicComponentFromSomeDiv.instance ", dynamicComponentFromSomeDiv.instance); // могу у него менять проперти и делать subscribe на эвент эмиттер
        //
        const data = {prop: 'createComponent prop'};

        if (data) {
            Object.keys(data).forEach((key: string) => {
                (this._componentRef.instance)[key] = data[key];
            });
        }

        // 3ий способ через ngComponentOutlet
        setTimeout(() => {
            this._dynamicComponentClass = ClassExampleComponent;
        }, 3000);

    }

    ngAfterViewInit() {
        // Продолжение из пункта 1, использую кастомный див (some-div-element-container) в качестве viewFromSomeDivElementRef, при этом переаппенжу в этот див из вью компоненты, если бы не было этих строк, то
        // отрендерилось бы во вью компоненты
        // for (let node of this.contentEmbeddedView.rootNodes) {
        //     if (node) {
        //         this.viewFromSomeDivElementRef.nativeElement.appendChild(node);
        //     }
        // }


        /************************************************/
        // способ показывающий что под капотом делает способ this.view.createComponent(componentFactory);
        // резолвлю ComponentFactory<T>, создаю componentRef, аттачу его вью во вью приложения,
        // аппендю к нужному дом элементу, вызываю детект чендж
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ClassExampleComponent);
        this._componentRefViaCreate = componentFactory.create(this.injector);
        this.appRef.attachView(this._componentRefViaCreate.hostView);

        const domElement = this._componentRefViaCreate.hostView['rootNodes'][0];
        document.body.appendChild(domElement);

        // если создаю так, то должен при дестрое сделать, вместо таймаута это надо положить в дестрой
        // в настоящем кейсе
        setTimeout(() => {
            this.appRef.detachView(this._componentRefViaCreate.hostView);
            this._componentRefViaCreate.destroy();
        }, 3000);
        /************************************************/
        this._componentRefViaCreate.changeDetectorRef.detectChanges();


        // 4ый способ через директиву host
        this.host.view.createComponent(componentFactory);
        this.cdr.detectChanges();
    }

    ngOnDestroy() {
        // если вдруг к вью сделал несколько дайнемик компонент, то чищу вью + приравинваю собственную ссылку
        // на componentRef к null
        // this.viewFromSomeDiv.clear();

        if (this._componentRef) {
            this._componentRef.destroy();
        }

        this.contentEmbeddedView.destroy();
    }
}
