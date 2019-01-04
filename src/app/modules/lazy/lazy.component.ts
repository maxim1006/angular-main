import {Component, OnInit} from "@angular/core";
import {MLazyService} from "./lazy.service";
import {MDynamicService} from "@services/dynamic.service";
import {MLazyDynamicComponent} from "./components/lazy-dynamic/lazy-dynamic.component";

@Component({
    selector: 'm-lazy',
    templateUrl: "./lazy.component.html",
    viewProviders: [] //чтобы ограничить доступ к сервису только из компоненты, а из внешних компонент доступа нет
})
export class MLazyComponent implements OnInit {
    constructor(
        private mLazyService: MLazyService,
        private mDynamicService: MDynamicService
    ) {}

    public ngOnInit(): void {
        // так могу из лезийного модуля подгружать динамические компоненты
        this.mDynamicService.createDynamicComponent(MLazyDynamicComponent, {
            text: "MLazyDynamicComponent text"
        });

        // очищаю все компоненты
        setTimeout(() => {
            this.mDynamicService.clear();
        }, 3000);
    }
}

