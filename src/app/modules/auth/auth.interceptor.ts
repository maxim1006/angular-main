import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {isPlatformBrowser} from '@angular/common';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    }

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

        if (isPlatformBrowser(this.platformId)) {
            const idToken = localStorage.getItem('id_token');

            if (idToken) {
                const cloned = req.clone({
                    headers: req.headers.set('Authorization',
                        'Bearer ' + idToken)
                });

                return next.handle(cloned)
                    .pipe(tap(
                        (event: HttpEvent<any>) => {
                            if (event instanceof HttpResponse) {
                            }
                        },
                        (err: any) => {
                            if (err instanceof HttpErrorResponse && err.status === 401) {
                                // because of cycle injection of services
                                // let someService: SomeService = self.injector.get(SomeService);

                                console.log('401 error', err);

                                this.router.navigate(['/']);
                            }
                        })
                    );
            } else {
                return next.handle(req);
            }
        }
    }
}
