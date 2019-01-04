import {
    BrowserModule,
    EVENT_MANAGER_PLUGINS,
    HAMMER_GESTURE_CONFIG,
    HammerGestureConfig
} from '@angular/platform-browser';
import {APP_INITIALIZER, Injector, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MHomeModule} from "./modules/m-home/m-home.module";
import {MRxjsModule} from "./modules/m-rxjs/m-rxjs.module";
import {MForRootModule} from "./modules/m-for-root/m-for-root.module";
import {SharedModule} from "./modules/shared/shared.module";
import {RouteService} from "./route.service";
import {MFormsModule} from "./modules/m-forms/m-forms.module";
import {MHttpModule} from "./modules/m-http/m-http.module";
import {AppRoutingModule, MyPreloadStrategy, ProtectedLazyGuard} from "./app-routing.module";
import {PageUtilsService} from "./common/services/page-utils.service";
import {domenToken} from "./modules/shared/tokens/tokens";
import {AppService} from "./modules/app.service";
import {HammerPluginPatch} from "./common/patches/hammer-plugin.patch";
import {PageLoaderService} from "@services/page-loader.service";
import {StaticInjector} from "@angular/core/src/di/injector";
import {MAdminComponent} from "./modules/admin/admin.component";
import {MAdminGuardService} from "./modules/admin/admin-guard.service";
import {MHttpRequestInterceptor} from "./common/interceptors/http-request.interceptor";
import {MDynamicService} from "@services/dynamic.service";
import {MDynamicInternalService} from "@services/dynamic-internal.service";
import { MDynamicAppComponent } from './components/dynamic-app/dynamic-app.component';


export function routeServiceFactory (route: RouteService):()=>{} {
    return () => route.init()
}

export class MyHammerConfig extends HammerGestureConfig  {
    overrides = <any>{
        'swipe': {velocity: 0.4, threshold: 20} // override default settings
    }
}



/*Создать инстанс сервиса*/
const childInjector: Injector = Injector.create({
    providers: [{provide: PageUtilsService, useClass: PageUtilsService, deps: []}]
});



@NgModule({
    declarations: [
        AppComponent,
        MAdminComponent,
        MDynamicAppComponent
    ],
    imports: [
        BrowserModule, //подключает коммон модуль, директивы, пайпы
        FormsModule, //подключает ngModel модуль
        BrowserAnimationsModule, //модуль для анимаций
        HttpClientModule,
        MHomeModule,
        MFormsModule,
        MHttpModule,
        SharedModule,
        MRxjsModule,
        MForRootModule.forRoot({data: 1}), //так могу в модуль прокинуть инфу
        AppRoutingModule //этот модуль, в котором все руты приложения должен идти в самом конце, после всех модулей с RouterModule.forChild(routes), это из-за wildCard модуля
    ],
    providers: [
        MAdminGuardService,
        MDynamicService,
        MDynamicInternalService,
        {provide: domenToken, useValue: domenToken},
        {provide: "NamedService", useClass: AppService, multi: true},
        MyPreloadStrategy,
        ProtectedLazyGuard,
        {provide: "someOptionalObject.someOptionalProperty", useValue: "someOptionalPropertyValueFromOptionalProveder"},
        {
            provide: HAMMER_GESTURE_CONFIG,
            useClass: MyHammerConfig
        },

        /*Эта часть нужна, чтобы загрузить какие-то данные перед всей аппликухой*/
        RouteService,
        {
            provide: APP_INITIALIZER,
            useFactory: routeServiceFactory,
            deps: [RouteService],
            multi: true
        },
        ///////////////

        //hammer fix
        {
            provide: EVENT_MANAGER_PLUGINS,
            useClass: HammerPluginPatch,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MHttpRequestInterceptor,
            multi: true
        }

        //{provide: APP_BASE_HREF, useValue: '/'} //можно использовать ExampleComponent.ts вместо <base href="/">
    ],
    bootstrap: [
        AppComponent
    ],
    entryComponents: [
        MDynamicAppComponent
    ]
})
export class AppModule {
    constructor (private injector: Injector) {
        // console.log(this.injector.get(PageUtilsService) === childInjector.get(PageUtilsService)); // false - создал новый инстанс сервиса (см. выше) и сравниваю с общим
    }
}



/*как в дев моде получить севис из инжектора из консоли?
* ng.probe($0).providerTokens - компоненты и сервисы
* ng.probe($0).providerTokens.map(x => x.name) - посмотреть их имена
* получить сервис ng.probe($0).providerTokens.find(x.name === "LogService")
* получить инстанс сервиса компонента ng.probe($0).injector.get(ng.probe($0).providerTokens.find(x.name === "LogService"))
* */
