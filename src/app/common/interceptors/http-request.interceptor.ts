import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {finalize, delay} from "rxjs/operators";

@Injectable()
export class MHttpRequestInterceptor implements HttpInterceptor {
    private requestsNumber = 0;
    private loaderElement: Element;

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.showLoader();

        if (request.url.includes("http-request-interceptor")) {
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

    private initLoader() {
        if (!this.loaderElement) {
            this.loaderElement = document.createElement("div");
            this.loaderElement.className = "m-http-request-loader";
            document.body.appendChild(this.loaderElement);
        }
    }

    showLoader() {
        this.initLoader();

        if (this.requestsNumber === 0) {
            requestAnimationFrame(() => {
                if (this.requestsNumber !== 0) {

                    this.loaderElement.className = "m-http-request-loader _loading-start";

                    requestAnimationFrame(() => {
                        if (this.requestsNumber !== 0) {
                            this.loaderElement.className = "m-http-request-loader _loading";
                        }
                    });
                }
            });
        }

        this.requestsNumber++;
    }

    hideLoader() {
        if (this.requestsNumber === 1) {
            requestAnimationFrame(() => {
                if (this.requestsNumber === 0) {
                    this.loaderElement.className = "m-http-request-loader";
                }
            });
        }

        this.requestsNumber--;
    }
}
