import {Injectable, Injector, NgModuleFactoryLoader, NgModuleRef} from '@angular/core';

// Это типо как lazy-af только руками загружаю модуль он возвращает готовый модуль

@Injectable({
    providedIn: 'root'
})
export class LazyRuntimeModuleService {

    constructor(
        private loader: NgModuleFactoryLoader,
        private injector: Injector
    ) {
    }

    // так получаю лезийно NgModuleRef из него вытаскиваю всю необходимую инфо и делаю компонент, пример в RunLazyRuntimeComponent

    load(): Promise<NgModuleRef<any>> {
        const path = 'src/app/modules/lazy-runtime/lazy-runtime.module#LazyRuntimeModule';

        return this.loader.load(path).then(moduleFactory => moduleFactory.create(this.injector));
    }
}
