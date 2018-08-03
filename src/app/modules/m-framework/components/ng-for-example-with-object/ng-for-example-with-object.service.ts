import { Injectable, Inject } from "@angular/core";
import {domenToken} from "../../../shared/tokens/tokens";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {map} from "rxjs/internal/operators";


@Injectable() //дает возможность инжектировать что-нибудь.
export class NgForExampleWithObjectService {
    constructor(
        @Inject(domenToken) private _domenToken, //могу так заинжектить, так как сказал об этом в модуле
        private _http: HttpClient
    ) {}

    public getFamily():Observable<any> {

        return this._http.get(`${this._domenToken}familyObj.json`)
               .pipe(map(res => {
                   return res;
                   //console.log(res.json());
               }));

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