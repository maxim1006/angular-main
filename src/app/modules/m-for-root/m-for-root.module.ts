import {InjectionToken, ModuleWithProviders, NgModule} from '@angular/core';

import {MForRootComponent} from './m-for-root.component';

export const ForRootDataServiceConfig = new InjectionToken('mForRootDataService'); // делаю этот токен, чтобы не перезаписывался сервис, если вдруг 2 одинаковых имени зададут подряд.

@NgModule({
    imports: [],
    exports: [],
    declarations: [MForRootComponent],
    providers: [],
})
export class MForRootModule {
    static forRoot(data: any): ModuleWithProviders {

        return {
            ngModule: MForRootModule,
            providers: [
                {provide: ForRootDataServiceConfig, useValue: data || {}}
            ]
        };
    }
}
