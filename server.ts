import 'zone.js/dist/zone-node';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as routers from './server/routers';
import * as path from 'path';
import "./server/mail/mail";
import * as compression from 'compression';
import shouldCompress from './server/helpers/server.helper';
import {ngExpressEngine} from '@nguniversal/express-engine';
import {AppServerModule} from './src/main.server';
import {join} from "path";
import {APP_BASE_HREF} from '@angular/common';
import {existsSync} from "fs";

const app = express(),
    // тут обязательно process.env.PORT а то будет конфликт с ангуларовскими настройками
    port = process.env.PORT || 4000,
    root = '/api/',
    isProduction = process.env.NODE_ENV === "production";

const allowCrossDomain = (req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
};


// Передаю в переменнные окружения значения из .env с помощью dotenv нпм пакета
if (!isProduction) {
    require('dotenv').config();
    // console.log(process.env.CUSTOM_VARIABLE);
}


// Add your mock router here
const appRouters = [
    {
        url: 'dictionaries',
        middleware: routers.dictionariesRouter
    },
    {
        url: 'example',
        middleware: routers.exampleRouter
    },
    {
        url: 'family',
        middleware: routers.familyRouter
    },
    {
        url: 'rxjs',
        middleware: routers.rxjsRouter
    },
    // у multer есть зависимости которые ссылаются на new Buffer, на это ругается нода и не собирается как починят
    // раскомментировать
    {
        url: 'upload',
        middleware: routers.uploadRouter
    },
    {
        url: 'login',
        middleware: routers.loginRouter
    }
];

app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
// включаю гзип
app.use(compression({filter: shouldCompress}));

// TODO переносить картинки, так как tsw этого не делает, приходится подкладывать в dist руками
app.use(root + 'images', express.static(path.join(__dirname, './mocks/images')));

appRouters.forEach(router => app.use(root + router.url, router.middleware));



// start angular server
// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
const distFolder = join(process.cwd(), './dist/angular-cli-project/browser');
const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

app.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
}));

app.set('view engine', 'html');
app.set('views', distFolder);

app.get('*.*', express.static(distFolder, {
    maxAge: '1y'
}));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
    res.render(indexHtml, {req, providers: [{provide: APP_BASE_HREF, useValue: req.baseUrl}]});
});
/////////////////////////////



// Непонятная чуйня-обертка и main.server реэкспорт от ангулар
// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
    app.listen(port, () => {
        console.log(`Mock server is listening on port ${port}`);
    });
}

export * from './src/main.server';


