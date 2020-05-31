import { Component, OnDestroy, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { destroyMixin } from "../../../m-framework/components/mixins/destroy.mixin";

@Component({
    selector: "m-translate",
    template: `
        {{ "HOME.hello" | translate: param }}
        <p></p>
        {{ "HOME.first" | translate }}
        <p></p>
        <div
            [translate]="'HOME.hello'"
            [translateParams]="{ value: 'world' }"
        ></div>
        <p></p>
        <div [innerHTML]="'HOME.html' | translate: param"></div>
        <p></p>
        {{ "HOME.unknown" | translate: param }}

        <p>
            <button (click)="_changeLang('eng')">Change to english</button>
            <button (click)="_changeLang('ru')">Change to russian</button>
        </p>
    `,
})
export class TranslateComponent extends destroyMixin() implements OnDestroy {
    param = { value: "Max" };

    constructor(private translateService: TranslateService) {
        super();

        this.translateService.setDefaultLang("eng");

        translateService
            .get("HOME.hello", { value: "world" })
            .subscribe((res: string) => {
                console.log(res);
            });
    }

    _changeLang(lang: string): void {
        this.translateService.use(lang);
    }
}
