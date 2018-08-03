import {Component} from "@angular/core";
import {MLazyService} from "./m-lazy.service";

@Component({
    selector: 'm-lazy',
    templateUrl: "./m-lazy.component.html",
    viewProviders: [] //чтобы ограничить доступ к сервису только из компоненты, а из внешних компонент доступа нет
})
export class MLazyComponent {
    constructor(private mLazyService: MLazyService) {}
}

