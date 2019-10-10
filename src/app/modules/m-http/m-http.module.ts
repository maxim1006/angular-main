import {InjectionToken, NgModule} from '@angular/core';
import {httpInjectables, MHttpComponent} from './m-http.component';
import {NewService, NewService2} from './new.service';
import {SharedModule} from '../shared/shared.module';


export function httpModuleFactory(newService2: NewService2) {
    return new NewService(newService2);
}

export abstract class RestrictedNewService {
    restrictedMethod: () => any;
}

// делаю этот токен, чтобы не перезаписывался сервис, если вдруг 2 одинаковых имени зададут подряд.
export const ValueConfig = new InjectionToken('Value');


@NgModule({
    imports: [SharedModule],
    exports: [MHttpComponent],
    declarations: [MHttpComponent],
    providers: [
        httpInjectables,
        NewService2,
        {provide: ValueConfig, useValue: 'someValue'},
        // могу использовать любой класс через useClass:
        // {provide: MHttpService, useClass: MHttpService},
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


