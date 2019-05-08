import {AfterViewInit, Component, HostBinding, Inject, OnInit, Optional, ViewChild, ViewContainerRef} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {PageLoaderService} from '@services/page-loader.service';
import {animate, group, query, style, transition, trigger} from '@angular/animations';
import {MDynamicService} from '@services/dynamic.service';
import {MDynamicAppComponent} from './components/dynamic-app/dynamic-app.component';

export const routerTransition: any = trigger('routerTransition', [
    transition('* <=> *', [
        /* order */
        /* 1 */ query(':enter, :leave', style({position: 'fixed', width: '100%'})
            , {optional: true}),
        query(':enter', style({transform: 'translateY(200px)', opacity: 0})
            , {optional: true}),
        // /* 2 */ group([  // block executes in parallel
        query(':leave', [
            style({transform: 'translateY(0%)'}),
            animate('0.3s ease-out', style({transform: 'translateY(200px)', opacity: 0}))
        ], {optional: true}),
        query(':enter', [
            style({transform: 'translateY(200px)', opacity: 0}),
            animate('0.3s ease-in', style({transform: 'translateY(0%)', opacity: 1}))
        ], {optional: true}),

        // ])
    ])
]);

export const routerTransition1: any = trigger('routerTransition', [
    transition('* <=> *', [
        /* order */
        /* 1 */ query(':enter, :leave', style({position: 'fixed', width: '100%'})
            , {optional: true}),
        query(':enter', style({transform: 'translateX(200px)', opacity: 0})
            , {optional: true}),
        // /* 2 */ group([  // block executes in parallel
        group([  // block executes in parallel
            query(':leave', [
                style({transform: 'translateX(0%)'}),
                animate('0.2s cubic-bezier(0.4, 0.0, 1, 1)', style({transform: 'translateX(-300px)', opacity: 0}))
            ], {optional: true}),
            query(':enter', [
                style({transform: 'translateX(200px)'}),
                animate('0.4s cubic-bezier(0.0, 0.0, 0.2, 1)', style({transform: 'translateX(0%)', opacity: 1}))
            ], {optional: true}),
        ])
        // ])
    ])
]);

@Component({
    selector: 'app-component',
    templateUrl: './app.component.html',
    // styleUrls: ['./app.component.css']
    animations: [routerTransition1]
})
export class AppComponent implements OnInit, AfterViewInit {

    // пример readonly объекта и массива
    public readOnlyObject: Readonly<{ name: string }> = {
        name: 'Max'
    };

    public readOnlyArray: ReadonlyArray<{ name: string }> = [{
        name: 'Max'
    }];
    /*************************************/


    @ViewChild('dynamicComponent', {read: ViewContainerRef})
    dynamicComponentRef: ViewContainerRef;

    @HostBinding('class')
    public hostClass: String = 'app-component';

    public ngOnInit(): void {
        if (this.swUpdate.isEnabled) {

            this.swUpdate.available.subscribe(() => {

                if (confirm('New version available. Load New Version?')) {

                    window.location.reload();
                }
            });
        }
    }

    constructor(
        @Optional() @Inject('someOptionalObject.someOptionalProperty') private optionalPropery,
        public pageLoaderService: PageLoaderService,
        private mDynamicService: MDynamicService,
        private swUpdate: SwUpdate
    ) {}

    activateEvent(event) {
        // this.pageLoaderService.activateRoute(event);
        console.log(event, ' activated component');
    }

    deactivateEvent(event) {
        // this.pageLoaderService.deactivateRoute();
        console.log(event, ' deactivated component');
    }

    getState(outlet) {
        return outlet.activatedRouteData.state;
    }

    ngAfterViewInit() {
        this.mDynamicService.init(this.dynamicComponentRef);

        // Создаю динамический компонент, как пример для динамического сервиса.
        const dynamicComponentRef = this.mDynamicService.createDynamicComponent(MDynamicAppComponent, {
            text: 'text from MDynamicAppComponent'
        });

        // делаю детект только в апп компоненте, так как обычно буду вставлять в onInit, но в данном случае изначальный инит сервиса нужен.
        dynamicComponentRef.changeDetectorRef.detectChanges();

        // убиваю компонент
        setTimeout(_ => dynamicComponentRef.destroy(), 3000);
    }


}


