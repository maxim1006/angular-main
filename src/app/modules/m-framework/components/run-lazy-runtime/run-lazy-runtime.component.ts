import {Component, ViewChild, ViewContainerRef} from '@angular/core';
import {LazyRuntimeModuleService} from '../../services/lazy-module.service';

// демонстрация lazy-af модуля

@Component({
    selector: 'm-run-lazy-runtime',
    templateUrl: './run-lazy-runtime.component.html',
    styleUrls: ['./run-lazy-runtime.component.less']
})
export class RunLazyRuntimeComponent {
    @ViewChild('vcr', { read: ViewContainerRef })
    vcrRef: ViewContainerRef;

    public load: boolean;

    constructor(
        private lazyRuntimeModuleService: LazyRuntimeModuleService
    ) {
    }


    // это пример лезийной подгрузки модуля 'src/app/modules/lazy-runtime/lazy-runtime.module#LazyRuntimeModule', затем
    // получения фактори этого модуля, забираю оттуда компонент и вставляю во вью контейнер
    _loadRuntimeModule(): void {
        this.lazyRuntimeModuleService.load().then((ngModuleFactory: any) => {
            // console.log(data);
            this.vcrRef.createComponent(
                ngModuleFactory.componentFactoryResolver.resolveComponentFactory(ngModuleFactory._bootstrapComponents[0])
            );
        });
    }
}
