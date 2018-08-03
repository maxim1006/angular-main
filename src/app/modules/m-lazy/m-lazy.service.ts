import {Injectable} from '@angular/core';
import {MLazyModule} from "./m-lazy.module";


// providedIn: MLazyModule - так в лезийном модуле не сработает, нужен "rrot"
@Injectable({
    providedIn: "root"
})
export class MLazyService {
    
    constructor() {
        console.log("MLazyModule constructor");
    }
}