import {Injectable, NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {MRouterComponent} from './router.component';
import {RouterIdComponent} from './components/router-id.component';
import {FormsModule} from '@angular/forms';
import {MRouterPopupComponent} from './components/router-popup.component';
import {ActivatedRouteSnapshot, Resolve, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {domenToken, domenTokenDb} from '../shared/tokens/tokens';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs/index';
import {delay} from 'rxjs/internal/operators';


@Injectable()
export class RouterResolve implements Resolve<any> {
    constructor(private http: HttpClient) {}

    // ActivatedRouteSnapshot - хранит инфо о url, queryParams, data,
    // state - state роутера, нод в роутере и т.д.
    // могу их использовать чтобы чтото подгружать в компонент относительно пути
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.http.get(`${domenTokenDb}family`);
    }
}

@Injectable()
export class RouterPopupResolve implements Resolve<any> {
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const routerPopupData = 'router popup content';
        return of(routerPopupData).pipe(delay(2000));
    }
}




const routes: Routes = [
    {
        path: '',
        component: MRouterComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'default',
            },
            {
                path: 'default',
                component: RouterIdComponent,
                data: {
                    title: 'Router'
                },
                // все что в resolve также попадет в data, вызывается когда переходим на данный роут и создается компонент, удобно передавать асинхронную дату на переход роута
                resolve: {
                    data: RouterResolve
                },
                children: [
                    {
                        path: 'routerPopupPath',
                        component: MRouterPopupComponent,
                        outlet: 'routerPopup',
                        // resolve: {
                        //     content: RouterPopupResolve
                        // }
                    }
                ]
            },
            {path: ':id', component: RouterIdComponent},
        ]
    }
];


@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        RouterModule.forChild(routes),
    ],
    declarations: [
        MRouterComponent,
        RouterIdComponent,
        MRouterPopupComponent
    ],
    providers: [RouterResolve, RouterPopupResolve]
})
export class MRouterModule {}
