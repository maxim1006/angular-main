import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import {Router} from '@angular/router';
import {Injectable, Injector} from '@angular/core';
import {tap} from 'rxjs/internal/operators';
import {Observable} from 'rxjs/index';


// {
//     provide: HTTP_INTERCEPTORS,
//     useClass: SessionInterceptor,
//     multi: true
// },

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router, private injector: Injector) {}

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const self = this;

        return next.handle(request).pipe(tap(
            (event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {}
            },
            (err: any) => {
                    if (err instanceof HttpErrorResponse && err.status === 401) {
                        // because of cycle injection of services
                        // let someService: SomeService = self.injector.get(SomeService);

                        console.log('401 error', err);

                        self.router.navigate(['/']);
                    }
                })
        );
    }
}
