import {ChangeDetectorRef, Component, HostBinding, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {domenToken, domenTokenDb} from '../../shared/tokens/tokens';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {NavigationEnd, Router} from '@angular/router/';
import {concatMap, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {switchMap} from 'rxjs/internal/operators';


export const slideInDownAnimation: any =
    trigger('routeAnimation', [
        state('*',
            style({
                opacity: 1,
                transform: 'translateX(0)'
            })
        ),
        transition(':enter', [
            style({
                opacity: 0,
                transform: 'translateX(-100%)'
            }),
            animate('0.2s ease-in')
        ]),
        transition(':leave', [
            animate('0.5s ease-out', style({
                opacity: 0,
                transform: 'translateX(-100%)'
            }))
        ])
    ]);



@Component({
    selector: 'router-id',
    template: `
        Your id is: {{params.id}}<br />
        param is: {{params.param}}
        Your data is: {{family | json}}

        <router-outlet name="routerPopup"></router-outlet>
    `,
    animations: [ slideInDownAnimation ]
})
export class RouterIdComponent implements OnInit {
    routerSubscription: any;
    public family;
    @HostBinding('@routeAnimation') routeAnimation = true;
    @HostBinding('style.display')   display = 'block';
    @HostBinding('style.position')  position = 'absolute';
    @HostBinding('style.transform')  initTransform = 'translateY(100%)';

    params: Params;
    constructor(private route: ActivatedRoute,
                private http: HttpClient,
                private router: Router,
                private cdr: ChangeDetectorRef
    ) {}


    ngOnInit() {
        // так могу получить 1 раз
        // this.params = this.route.snapshot.params;

        this.route.params.pipe(
            switchMap(
                    (params: Params) => {
                        this.params = params;
                        return this.http.get(`${domenTokenDb}family` + params['id'] + '.json');
                    }
            ))
            .pipe(
                map((family, params) => {
                    return {family, params};
                })
            )
            .subscribe(({family, params}) => {
                console.log('params ', params);
                 this.family = family;
            }, (err) => {
                this.family = 'There is no data fo you';
            });

        this.route.queryParams.subscribe((queryParams) => {
            console.log('queryParams ', queryParams);
        });

        this.route.data.subscribe((data) => {
            console.log('dataParams ', data);
        });
    }

    ngAfterViewInit() {
        this.routerSubscription = this.router.events.subscribe((url: any) => {
            if (url instanceof NavigationEnd) {
                this.cdr.detectChanges();
            }
        });
    }

    ngOnDestroy() {
        this.routerSubscription.unsubscribe();
    }

    // так могу прокидывать данные из роутера в компонент (resolve)
    resolvedDataInRoute: Observable<any> = this.route.data;
}
