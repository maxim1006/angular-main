//Этот сервис нужен для того чтобы инициализировать приложение лишь после загрузки каких-то данных,
//затем в AppModule описываю APP_INITIALIZER

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';


@Injectable()
export class RouteService {

    routes: Routes;

    constructor(protected http: HttpClient) {
    }

    init(): Promise<Routes> {
        const {domenUrl} = environment;
        const o = this.http
            .get(`${domenUrl}/assets/mocks/route.json`).toPromise();

        // o.then(
        //     (routes) => {
        //         this.routes = <Routes>routes;
        //         console.log(this.routes, ' this is the route.json, that loaded before app had initialized');
        //     },
        //     (error) => console.log('RouteService init data ', error)
        // ).catch(() => {
        //     return Promise.resolve("http://");
        // });

        // return o as Promise<Routes>;
        return Promise.resolve({});
    }
}

export interface Routes {
    domain?: string;
    gateWay?: string;
    identityProvider?: string;
}
