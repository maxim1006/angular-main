import {ApplicationRef, Inject, NgModule, PLATFORM_ID} from '@angular/core';
import {BootstrapInTag2Component} from './bootstrp-in-tag2.component';
import {BootstrapInTag1Component} from './bootstrp-in-tag1.component';
import {BootstrapInTagComponent} from './bootstrp-in-tag.component';
import {BrowserModule} from '@angular/platform-browser';
import {isPlatformBrowser} from '@angular/common';

// этот модуль надо бутстрапить в main.ts вместо app.module

@NgModule({
    imports: [BrowserModule],
    exports: [],
    declarations: [BootstrapInTagComponent, BootstrapInTag1Component, BootstrapInTag2Component],
    entryComponents: [BootstrapInTagComponent, BootstrapInTag1Component, BootstrapInTag2Component],
    providers: [],
})
export class BootstrapInTagModule {
    private _appRef: ApplicationRef;

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    }

    ngDoBootstrap(ref: ApplicationRef) {
        let element;
        this._appRef = ref;

        if (isPlatformBrowser(this.platformId)) {

            if (element = document.querySelector('#bootstrapInTag')) {
                this._appRef.bootstrap(BootstrapInTagComponent, element);
            }

            if (element = document.querySelector('#bootstrapInTag1')) {
                this._appRef.bootstrap(BootstrapInTag1Component, element);
            }

            if (element = document.querySelector('#bootstrapInTag2')) {
                this._appRef.bootstrap(BootstrapInTag2Component, element);
            }
        }
    }
}
