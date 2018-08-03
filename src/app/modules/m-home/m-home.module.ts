import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {MHomeComponent} from "./m-home.component";
import {HomeService} from "./home.service";

@NgModule({
    imports: [SharedModule],
    exports: [MHomeComponent],
    declarations: [MHomeComponent],
    providers: [
        // {provide: "NamedService", useClass: HomeService, multi: true}
    ]
})
export class MHomeModule {

}