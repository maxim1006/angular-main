import {SharedModule} from '../shared/shared.module';
import {NgModule} from '@angular/core';
import {MRxjsComponent} from './m-rxjs.component';
// import {events} from './reducers/reducers';
import {RxjsExampleComponent} from './components/rxjs-example/rxjs-example.component';
import {RxJsComponent} from './components/rx-js/rx-js.component';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MRxjsAsyncPipeComponent} from './components/async-pipe/m-rxjs-async-pipe.component';
import {RxjsOnDestroyComponent} from './components/rxjs-example/rxjs-ondestroy.component';
import { RxjsExample1Component } from './components/rxjs-example1/rxjs-example1.component';

const routes: Routes = [
    { path: 'rxjs', component: MRxjsComponent, children: [{
            path: '', redirectTo: 'rx-js', pathMatch: 'full'
        },
        {
            path: 'rx-js',
            component: RxJsComponent, data: { state: 'rx-js' }
        },
        {
            path: 'rx-js-async-pipe',
            component: MRxjsAsyncPipeComponent, data: { state: 'rx-js-async-pipe' }
        },
        {
            path: 'rxjs-example',
            component: RxjsExampleComponent, data: { state: 'rxjs-example' }
        },
        {
            path: 'rxjs-example1',
            component: RxjsExample1Component, data: { state: 'rxjs-example1' }
        }
    ]
    }
];

@NgModule({
    imports: [
        SharedModule,
        BrowserAnimationsModule,
        RouterModule.forChild(routes),
        // StoreModule.provideStore({ events })   //not working in aot and for now it sucks
    ],
    exports: [MRxjsComponent],
    declarations: [
        MRxjsComponent,
        RxjsExampleComponent,
        RxjsExample1Component,
        RxJsComponent,
        MRxjsAsyncPipeComponent,
        RxjsOnDestroyComponent
        // NgrxDispatchComponent,
        // NgrxSubscribeComponent
    ],
    providers: []
})

export class MRxjsModule {}


