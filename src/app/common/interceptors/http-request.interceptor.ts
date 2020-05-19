import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {finalize, delay, filter, tap} from 'rxjs/operators';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {isPlatformBrowser} from '@angular/common';

@Injectable()
export class MHttpRequestInterceptor implements HttpInterceptor {
    private requestsNumber = 0;
    private loaderElement: Element;
    private canShowLoader = true;

    constructor(
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: Object,
    ) {
        if (isPlatformBrowser(this.platformId)) {
            this.router.events.pipe(
                filter(event => event instanceof NavigationEnd)
            ).subscribe(_ => {
                this.canShowLoader = false;
            });

            this.router.events.pipe(
                filter(event => event instanceof NavigationStart),
            ).subscribe(_ => {
                this.canShowLoader = true;
            });
        }
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.canShowLoader) {
            this.showLoader();
        }

        if (isPlatformBrowser(this.platformId)) {

            if (request.url.includes('http-request-interceptor')) {
                return next.handle(request).pipe(
                    /* Only for showcase to show delay of loader*/
                    delay(5000),
                    /*******************************************/
                    finalize(() => {
                        this.hideLoader();
                    })
                );
            } else {
                return next.handle(request).pipe(
                    finalize(() => {
                        this.hideLoader();
                    })
                );
            }

        }
    }

    private initLoader() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.loaderElement) {
                this.loaderElement = document.createElement('div');
                this.loaderElement.className = 'm-http-request-loader';
                document.body.appendChild(this.loaderElement);
            }
        }
    }

    showLoader() {
        this.initLoader();

        if (isPlatformBrowser(this.platformId)) {
            if (this.requestsNumber === 0) {
                requestAnimationFrame(() => {
                    if (this.requestsNumber !== 0) {

                        this.loaderElement.className = 'm-http-request-loader _loading-start';

                        requestAnimationFrame(() => {
                            if (this.requestsNumber !== 0) {
                                this.loaderElement.className = 'm-http-request-loader _loading';
                            }
                        });
                    }
                });
            }
        }

        this.requestsNumber++;
    }

    hideLoader() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.requestsNumber === 1) {
                requestAnimationFrame(() => {
                    if (this.requestsNumber === 0) {
                        this.loaderElement.className = 'm-http-request-loader';
                    }
                });
            }
        }

        this.requestsNumber--;
    }
}
