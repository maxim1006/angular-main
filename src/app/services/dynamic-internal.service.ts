import {
    ComponentFactory,
    ComponentRef,
    Injectable,
    ViewContainerRef
} from "@angular/core";


@Injectable()
export class MDynamicInternalService {

    private viewContainerRef: ViewContainerRef;

    /**
     * Don't use this method
     *
     * @internal
     */
    renderDynamicComponent(componentFactory: ComponentFactory<any>, data?: any, viewContainerRef?: ViewContainerRef): ComponentRef<any> {
        const targetContainerRef = viewContainerRef || this.viewContainerRef;
        if (targetContainerRef) {
            const componentRef = targetContainerRef.createComponent(componentFactory);

            if (data) {
                for (const i in data) {
                    componentRef.instance[i] = data[i];
                }
            }

            return componentRef;
        }
        return null;
    }

    /**
     * @internal
     * @param {ViewContainerRef} viewContainerRef
     */
    init(viewContainerRef: ViewContainerRef): void {
        this.viewContainerRef = viewContainerRef;
    }

    clear(): void {
        this.viewContainerRef && this.viewContainerRef.clear();
    }

    getContainer(): ViewContainerRef {
        return this.viewContainerRef;
    }

}
