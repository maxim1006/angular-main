import {
    Component, ComponentFactoryResolver, ComponentRef, Input, OnDestroy, Type, ViewChild,
    ViewContainerRef
} from '@angular/core';



@Component({
    selector: 'm-dynamic',
    template: `<ng-template #mDynamic></ng-template>`
})
export class MDynamicComponent implements OnDestroy {
    _model: MDynamicComponentConstructor;

    @Input()
    public set componentModel(value: MDynamicComponentConstructor) {
        this._model = value;
        this._createComponent();
    }
    public get componentModel() {
        return this._model;
    }

    private _componentRef: ComponentRef<any>;

    /**
     * пример использование директивы, которая на элементе будет <ng-template m-dynamic></ng-template>, и тут используется
     * import { Directive, ViewContainerRef } from '@angular/core';

     @Directive({
        selector: '[m-dynamic]',
    })
         export class MDynamicDirective {
        constructor(public viewContainerRef: ViewContainerRef) { }
    }

     * @param _componentFactoryResolver
     */
    //а в компоненте:
    // @ViewChild(MDynamicDirective) mDynamic: MDynamicDirective;

    @ViewChild('mDynamic', {read: ViewContainerRef}) mDynamic: ViewContainerRef;

    constructor(private _componentFactoryResolver: ComponentFactoryResolver) {}

    private _createComponent() {
        let model = this.componentModel,
            data;

        if (!model) {
            console.log('Please add componentModel to m-dynamic');
            return;
        }

        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(model.component),
            viewContainerRef = this.mDynamic;
        
        viewContainerRef.clear();

        this._componentRef = viewContainerRef.createComponent(componentFactory);

        data = model.data;

        if (data) {
            Object.keys(data).forEach((key: string) => {
                (<MDynamicComponentData>this._componentRef.instance)[key] = data[key];
            });
        }
    }

    ngOnDestroy() {
        if (this._componentRef) {
            this._componentRef.destroy();
        }
    }

}



export class MDynamicComponentConstructor {
    constructor(public component: Type<any>, public data: any) {}
}

export interface MDynamicComponentData {
    data: any;
}


