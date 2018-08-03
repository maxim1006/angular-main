import {NgModule, Injectable} from "@angular/core";
import {MHttpComponent, httpInjectables} from "./m-http.component";
import {MHttpService} from "./m-http.service";
import {NewService, NewService2} from "./new.service";
import {SharedModule} from "../shared/shared.module";
import {HttpClientModule} from "@angular/common/http";


export function httpModuleFactory(newService2: NewService2) {
    return new NewService(newService2);
}


@NgModule({
    imports: [SharedModule, HttpClientModule],
    exports: [MHttpComponent],
    declarations: [MHttpComponent],
    providers: [
        httpInjectables,
        NewService2,
        {provide: "Value", useValue: "someValue"},
        {provide: MHttpService, useClass: MHttpService},        
        {
            provide: NewService,
            useFactory: httpModuleFactory,
            deps: [NewService2]}
    ],
})
export class MHttpModule {}


