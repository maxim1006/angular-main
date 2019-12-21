import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as routers from './routers';
import * as path from 'path';

const app = express(),
    port = process.env.NODEJS_PORT || 3000,
    root = '/api/';

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

// TODO переносить картинки, так как tsw этого не делает, приходится подкладывать в dist руками
app.use(root + 'images', express.static(path.join(__dirname, './mocks/images')));

appRouters.forEach(router => app.use(root + router.url, router.middleware));

app.listen(port, () => {
    console.log(`Mock server is listening on port ${port}`);
});
