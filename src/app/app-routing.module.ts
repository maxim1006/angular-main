import {CanLoad, PreloadingStrategy, Route, RouterModule, Routes} from '@angular/router';
import {Injectable, NgModule} from '@angular/core';
import {MHttpComponent} from './modules/m-http/m-http.component';
import {MFormComponent} from './modules/m-forms/m-form.component';
import {PageNotFoundComponent} from './modules/shared/components/page-not-found/page-not-found.component';
import {MAdminComponent} from './modules/admin/admin.component';
import {MAdminGuardService} from './modules/admin/admin-guard.service';
import {MHomeComponent} from './modules/m-home/m-home.component';
import {MRxjsComponent} from './modules/m-rxjs/m-rxjs.component';
import {Observable, of} from 'rxjs';


@Injectable()
export class ProtectedLazyGuard implements CanLoad {
    constructor() {}
    canLoad() {
        return JSON.parse(localStorage.getItem('lazy'));
    }
}



//Можно создать свой класс с preloadStrategy
export class MyPreloadStrategy implements PreloadingStrategy {
    preload(route: Route, load: () => Observable<any>): Observable<any> {
        return of(null); // если не хочу прелоад

        // если хочу кастомный прелоад
        // return route.data && route.data['preload'] ? load() : of(null);
    }
}



const routes: Routes = [
    // {path: '', redirectTo: '', pathMatch: 'full'}, // если просто хочу начать с апп компонента
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: MHomeComponent, data: { state: 'home' }},
    // {path: '', redirectTo: '/framework', pathMatch: 'full'}, //redirect example
    // {path: 'framework', component: MFrameworkComponent}, //simple module loading
    // {path: 'components', component: MComponentsComponent},
    {path: 'components', loadChildren: () => import('./modules/m-components/m-components.module').then(m => m.MComponentsModule), data: { state: 'components', preload: true }
    },
    {path: 'css', loadChildren: () => import('./modules/css/css.module').then(m => m.CssModule)},
    {path: 'typescript', loadChildren: () => import('./modules/typescript/typescript.module').then(m => m.TypescriptModule)},
    {path: 'http', component: MHttpComponent, data: { state: 'http' }},
    {path: 'forms', component: MFormComponent, data: { state: 'forms' }},
    {path: 'rxjs', component: MRxjsComponent, data: { state: 'rxjs' }},
    {path: 'framework', loadChildren: () => import('./modules/m-framework/m-framework.module').then(m => m.MFrameworkModule), data: {state: 'framework', preload: true}},
    {path: 'router', loadChildren: () => import('./modules/router/router.module').then(m => m.MRouterModule), data: {state: 'router', preload: true}},
    {path: 'ngrx', loadChildren: () => import('./modules/ngrx/ngrx.module').then(m => m.MNgrxModule), data: {state: 'ngrx', preload: true}},
    {path: 'redux', loadChildren: () => import('./modules/redux/redux.module').then(m => m.MReduxModule), data: {state: 'ngrx', preload: true}},
    {path: 'my-store', loadChildren: () => import('./modules/my-store/my-store.module').then(m => m.MyStoreModule)},
    {path: 'my-redux-store', loadChildren: () => import('./modules/my-redux-store/my-redux-store.module').then(m => m.MyReduxStoreModule)},
    //  preload: true - делаю специально, чтобы не подгружать лезийный модуль с помощью прелоадинга
    {path: 'lazy', loadChildren: () => import('./modules/lazy/lazy.module').then(m => m.MLazyModule), data: { state: 'lazy'}},
    {path: 'protected-lazy',
        canLoad: [ProtectedLazyGuard], // cпецифично для лезийных модулей или лезийных чайлдов
        loadChildren: () => import('./modules/m-protected-lazy/m-protected-lazy.module').then(m => m.MProtectedLazyModule), data: { state: 'protectedLazy'}
    },
    {
        path: 'admin',
        component: MAdminComponent,
        canActivate: [MAdminGuardService], // этот гард работает, просто в апп модуле подключил админ модуль со своим роутером.
        canDeactivate: [MAdminGuardService]
    },
    {path: '**', component: PageNotFoundComponent},
];

@NgModule({
    imports: [
        // preloadingStrategy: PreloadAllModules - начинает загрузку модулей сразу после загрузки основного
        // enableTracing: true позволяет посмотреть все переходы роутера
        // RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
        RouterModule.forRoot(routes, {
            preloadingStrategy: MyPreloadStrategy
        })
        // RouterModule.forRoot(routes, { preloadingStrategy: MyPreloadStrategy, enableTracing: true })
        // RouterModule.forRoot(routes, {useHash: true})
        // other imports here
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }

