import {InjectionToken, NgModule} from '@angular/core';
import {httpInjectables, MHttpComponent} from './m-http.component';
import {MHttpService} from './m-http.service';
import {NewService, NewService2} from './new.service';
import {SharedModule} from '../shared/shared.module';


export function httpModuleFactory(newService2: NewService2) {
    return new NewService(newService2);
}

export abstract class RestrictedNewService {
    restrictedMethod: () => any;
}

export const ValueConfig = new InjectionToken('Value'); // делаю этот токен, чтобы не перезаписывался сервис, если вдруг 2 одинаковых имени зададут подряд.


@NgModule({
    imports: [SharedModule],
    exports: [MHttpComponent],
    declarations: [MHttpComponent],
    providers: [
        httpInjectables,
        NewService2,
        {provide: ValueConfig, useValue: "someValue"},
        {provide: MHttpService, useClass: MHttpService},
        {
            provide: NewService,
            useFactory: httpModuleFactory,
            deps: [NewService2]
        },
        {
            provide: RestrictedNewService, // использую, чтобы ограничить какой-нибудь сервис до нужных методов, разумеется это работает только для тайпскрипта
            useExisting: NewService
        }
    ],
})
export class MHttpModule {}


