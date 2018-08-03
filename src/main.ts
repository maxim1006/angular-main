import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { hmrBootstrap } from './hmr';



if (environment.production) {
    enableProdMode();
    console.log("You are in Prod mode");
}

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule, {
    //ngZone: "noop" //так отключаю зоны в приложении
});

if (environment.hmr) {
    console.log("You are in HMR mode");
    if (module[ 'hot' ]) {
        hmrBootstrap(module, bootstrap);
    } else {
        console.error('HMR is not enabled for webpack-dev-server!');
        console.log('Are you using the --hmr flag for ng serve?');
    }
} else {
    bootstrap();
    console.log("You are in Dev mode");
}



//cat ./dist{file1, file2, file3}.js | gzip > gulpfile.js.gzip - //собрать все в 1 файл и добавить в gzip

//ngx build plus

