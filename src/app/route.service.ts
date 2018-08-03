//Этот сервис нужен для того чтобы инициализировать приложение лишь после загрузки каких-то данных,
//затем в AppModule описываю APP_INITIALIZER

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/internal/operators";


@Injectable()
export class RouteService {

    routes: Routes;

    constructor(protected http: HttpClient) {
    }

    init(): Promise<Routes> {
        let o = this.http.get("assets/mocks/route.json").toPromise();

        o.then(routes => {
            this.routes = <Routes>routes;
            console.log(this.routes, ' this is the route.json, that loaded before app had initialized');
        });

        return o as Promise<Routes>;
    }
}

export interface Routes {
    domain: string;
    gateWay: string;
    identityProvider: string;
}