import {ComponentFactoryResolver, ComponentRef, Injectable, Type, ViewContainerRef} from "@angular/core";
import {MDynamicInternalService} from "./dynamic-internal.service";


@Injectable()
export class MDynamicService {

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private dynamicInternalService: MDynamicInternalService) {
    }

    createDynamicComponent(componentClass: any, data?: any, viewContainerRef?: ViewContainerRef): ComponentRef<any> {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
        return this.dynamicInternalService.renderDynamicComponent(componentFactory, data, viewContainerRef);
    }

    /**
     * @internal
     * @param {ViewContainerRef} viewContainerRef
     */
    init(viewContainerRef: ViewContainerRef): void {
        this.dynamicInternalService.init(viewContainerRef);
    }

    clear(): void {
        this.dynamicInternalService.clear();
    }

    getContainer(): ViewContainerRef {
        return this.dynamicInternalService.getContainer();
    }

}
