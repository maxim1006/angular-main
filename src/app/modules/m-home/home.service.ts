import { Injectable } from "@angular/core";
import { MHomeModule } from "./m-home.module";

@Injectable({
    providedIn: "root",
})
export class HomeService {
    public name = "HomeService";

    constructor() {
        console.log(`Service ${this.name} is inited`);
        console.log("++++++++++++++");
    }
}
