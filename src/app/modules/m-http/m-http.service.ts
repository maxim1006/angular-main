import { Injectable } from "@angular/core";
import { Observable, Observer, Subscriber, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { domenToken } from "../shared/tokens/tokens";
import { HttpClient } from "@angular/common/http";
import { FamilyMember } from "./m-http.component";

@Injectable({
    providedIn: "root",
})
export class MHttpService {
    public _data: any;
    constructor(private http: HttpClient) {}

    getData(): Observable<FamilyMember[]> {
        return this.http
            .get<FamilyMember[]>(`${domenToken}family`)
            .pipe(catchError((error: any) => throwError(error)));
    }

    getDataById(): Observable<number> {
        return this.http
            .get<number>(`${domenToken}example/1`)
            .pipe(catchError((error: any) => throwError(error)));
    }

    postData(data): Observable<FamilyMember> {
        return this.http
            .post<FamilyMember>(`${domenToken}family`, data)
            .pipe(catchError((error: any) => throwError(error)));
    }

    postFile(formData: FormData): Observable<any> {
        return this.http
            .post<FamilyMember>(`${domenToken}example/upload`, formData)
            .pipe(catchError((error: any) => throwError(error)));
    }

    postFileOld(
        url: string,
        files: File[]
    ): { response: Observable<Response>; progress: Observable<number> } {
        let formData: FormData = new FormData(),
            progressObserver: Subscriber<number>,
            progress = Observable.create((subscriber: Subscriber<number>) => {
                progressObserver = subscriber;
            });

        for (let i = 0; i < files.length; i++) {
            formData.append("files[]", files[i]);
        }

        const response = Observable.create((observer: Observer<Response>) => {
            const xhr: XMLHttpRequest = new XMLHttpRequest();

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200 || xhr.status === 201) {
                        observer.next(xhr.response);
                        observer.complete();
                    } else {
                        observer.error(xhr.response);
                    }
                }
            };

            xhr.onerror = (error: any) => {
                console.log(error.target.status);
            };

            xhr.upload.onprogress = event => {
                if (progressObserver) {
                    progressObserver.next(
                        Math.round((event.loaded / event.total) * 100)
                    );
                }
            };

            xhr.open("POST", url, true);

            xhr.send(formData);
        });

        return { response, progress };
    }
}
