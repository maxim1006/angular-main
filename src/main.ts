import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { hmrBootstrap } from './hmr';



if (environment.production) {
    enableProdMode();
    console.log('You are in Prod mode');
}

// const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule, {
//     //ngZone: "noop" //так отключаю зоны в приложении
// });

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule)
    .then((ngModuleRef) => {
        if ('serviceWorker' in navigator && environment.production) {
            navigator.serviceWorker.register('ngsw-worker.js');
        }

        return ngModuleRef;
    });
// так не хочет работать hmrBootstrap так как ему нужен ngModuleRef, если не использую hmr то дописываю catch
// .catch(err => console.log(err));

if (environment.hmr) {
    console.log('You are in HMR mode');
    if (module[ 'hot' ]) {
        hmrBootstrap(module, bootstrap);
    } else {
        console.error('HMR is not enabled for webpack-dev-server!');
        console.log('Are you using the --hmr flag for ng serve?');
    }
} else {
    bootstrap();
}
