import {Injectable} from "@angular/core";
import {Observable, Observer, Subscriber} from "rxjs";
import {domenToken} from "../shared/tokens/tokens";
import {HttpClient} from "@angular/common/http";
import {delay, map, share} from "rxjs/operators";

@Injectable()
export class MHttpService {
    public _data: any;
    constructor(private _http: HttpClient) {}

    getData():Observable<any> {
        return this._http.get(`${domenToken}family.json`)
            .pipe(
                delay(2000),
                map (
                    (data) => {
                        return data
                    }
                ),
                share()
            );
    }

    postFile(url: string, files: File[]): { response: Observable<Response>, progress: Observable<number> } {
        let formData: FormData = new FormData(),
            progressObserver: Subscriber<number>,
            progress = Observable.create((subscriber: Subscriber<number>) => {
                progressObserver = subscriber;
            });

        for (let i = 0; i < files.length; i++) {
            formData.append("files[]", files[i]);
        }

        let response = Observable.create((observer: Observer<Response>) => {
            let xhr: XMLHttpRequest = new XMLHttpRequest();

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

            xhr.upload.onprogress = (event) => {
                if (progressObserver) {
                    progressObserver.next(Math.round(event.loaded / event.total * 100));
                }
            };

            xhr.open('POST', url, true);

            xhr.send(formData);
        });

        return {response, progress};
    }
}




