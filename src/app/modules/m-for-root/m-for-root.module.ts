import {NgModule} from '@angular/core';

import {MForRootComponent} from './m-for-root.component';
import {MForRootService} from "./m-for-root.service";

@NgModule({
    imports: [],
    exports: [],
    declarations: [MForRootComponent],
    providers: [],
})
export class MForRootModule {
    static forRoot(data: any): any {

        return {
            ngModule: MForRootModule,
            providers: [
                MForRootService,
                {provide: 'mForRootDataService', useValue: data}
            ]
        }
    }
}
