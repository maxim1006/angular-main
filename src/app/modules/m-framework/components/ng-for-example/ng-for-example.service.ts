import { Inject, Injectable } from "@angular/core";
import { domenToken } from "../../../shared/tokens/tokens";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable() //дает возможность инжектировать что-нибудь.
export class NgForExampleService {
    constructor(
        @Inject(domenToken) private _domenToken, //могу так заинжектить, так как сказал об этом в модуле
        private _http: HttpClient
    ) {}

    public getFamily(): Observable<any> {
        return this._http.get(`${this._domenToken}family.json`).pipe(
            map(res => {
                return res;
                //console.log(res.json());
            }),
            catchError(err => {
                console.log(err);
                return of([]);
                //return Observable.throw(err);
            })
        );

        // return [
        //     {
        //         name: "Max",
        //         age: 29,
        //         sex: "male"
        //     },
        //     {
        //         name: "Aliya",
        //         age: 30,
        //         sex: "female"
        //     },
        //     {
        //         name: "Anton",
        //         age: 30,
        //         sex: "male"
        //     }
        // ];
    }
}
