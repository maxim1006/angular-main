import {
    BrowserModule,
    EVENT_MANAGER_PLUGINS,
    HAMMER_GESTURE_CONFIG,
    HammerGestureConfig,
} from "@angular/platform-browser";
import {
    APP_INITIALIZER,
    ErrorHandler,
    Injectable,
    Injector,
    NgModule,
} from "@angular/core";

import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { MHomeModule } from "./modules/m-home/m-home.module";
import { MRxjsModule } from "./modules/m-rxjs/m-rxjs.module";
import { MForRootModule } from "./modules/m-for-root/m-for-root.module";
import { SharedModule } from "./modules/shared/shared.module";
import { RouteService } from "./route.service";
import { MFormsModule } from "./modules/m-forms/m-forms.module";
import { MHttpModule } from "./modules/m-http/m-http.module";
import {
    AppRoutingModule,
    MyPreloadStrategy,
    ProtectedLazyGuard,
} from "./app-routing.module";
import { domenToken } from "./modules/shared/tokens/tokens";
import { AppService } from "./modules/app.service";
import { HammerPluginPatch } from "./common/patches/hammer-plugin.patch";
import { MAdminComponent } from "./modules/admin/admin.component";
import { MAdminGuardService } from "./modules/admin/admin-guard.service";
import { MDynamicService } from "@services/dynamic.service";
import { MDynamicInternalService } from "@services/dynamic-internal.service";
import { MDynamicAppComponent } from "./components/dynamic-app/dynamic-app.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import {
    MissingTranslationHandler,
    MissingTranslationHandlerParams,
    TranslateLoader,
    TranslateModule,
} from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { MGlobalErrorService } from "@services/global-error.service";

export function routeServiceFactory(route: RouteService): () => {} {
    return () => route.init();
}

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
    overrides = <any>{
        swipe: { velocity: 0.4, threshold: 20 }, // override default settings
    };
}

// ngx-translate
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

export class MyMissingTranslationHandler implements MissingTranslationHandler {
    handle(params: MissingTranslationHandlerParams) {
        return "Missing translate value";
    }
}
/////////////////////////////

/*Создать инстанс сервиса*/
// const childInjector: Injector = Injector.create({
//     providers: [
//         { provide: PageUtilsService, useClass: PageUtilsService, deps: [] },
//     ],
// });

@NgModule({
    declarations: [AppComponent, MAdminComponent, MDynamicAppComponent],
    imports: [
        BrowserModule.withServerTransition({ appId: "serverApp" }), //подключает коммон модуль, директивы, пайпы
        FormsModule, //подключает ngModel модуль
        BrowserAnimationsModule, //модуль для анимаций
        HttpClientModule,
        MHomeModule,
        MFormsModule,
        MHttpModule,
        SharedModule,
        MRxjsModule,
        // так могу в модуль прокинуть инфу
        MForRootModule.forRoot({ data: 1 }),
        ServiceWorkerModule.register("ngsw-worker.js", {
            enabled: environment.production,
        }),
        TranslateModule.forRoot({
            missingTranslationHandler: {
                provide: MissingTranslationHandler,
                useClass: MyMissingTranslationHandler,
            },
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
        // этот модуль, в котором все руты приложения должен идти в самом конце,
        // после всех модулей с RouterModule.forChild(routes), это из-за wildCard модуля
        AppRoutingModule,
    ],
    providers: [
        MAdminGuardService,
        MDynamicService,
        MDynamicInternalService,
        { provide: domenToken, useValue: domenToken },
        { provide: "NamedService", useClass: AppService, multi: true },
        MyPreloadStrategy,
        ProtectedLazyGuard,
        {
            provide: "someOptionalObject.someOptionalProperty",
            useValue: "someOptionalPropertyValueFromOptionalProveder",
        },
        {
            provide: HAMMER_GESTURE_CONFIG,
            useClass: MyHammerConfig,
        },

        // создаю глобальный errorHandler
        {
            provide: ErrorHandler,
            useClass: MGlobalErrorService,
        },

        /*Эта часть нужна, чтобы загрузить какие-то данные перед всей аппликухой*/
        RouteService,
        {
            provide: APP_INITIALIZER,
            useFactory: routeServiceFactory,
            deps: [RouteService],
            multi: true,
        },
        ///////////////

        //hammer fix
        {
            provide: EVENT_MANAGER_PLUGINS,
            useClass: HammerPluginPatch,
            multi: true,
        },

        //{provide: APP_BASE_HREF, useValue: '/'} //можно использовать ExampleComponent.ts вместо <base href="/">
    ],
    bootstrap: [AppComponent],
    entryComponents: [MDynamicAppComponent],
})
export class AppModule {
    constructor(private injector: Injector) {
        // console.log(this.injector.get(PageUtilsService) === childInjector.get(PageUtilsService)); // false - создал новый инстанс сервиса (см. выше) и сравниваю с общим
    }
}

/*

Во всех zone.run, settimeout, requestanimationframe, при onPush у компоненты нужно вызывать this.cdr.markForCheck(),
так как свойство поменяли внутри контроллера, но инпут не поменялся следовательно никаких проверок, даже при внешнем detectChanges

Все js хендлеры на window document (scroll mousemove и т.д.) дергают changeDetection на всех компонентах на страничке

*/

/*как в дев моде получить севис из инжектора из консоли?
 * ng.probe($0).providerTokens - компоненты и сервисы
 * ng.probe($0).providerTokens.map(x => x.name) - посмотреть их имена
 * получить сервис ng.probe($0).providerTokens.find(x.name === "LogService")
 * получить инстанс сервиса компонента ng.probe($0).injector.get(ng.probe($0).providerTokens.find(x.name === "LogService"))
 * */
