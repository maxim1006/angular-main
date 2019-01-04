import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {MLazyComponent} from './lazy.component';
import {RouterModule, Routes} from '@angular/router';
import { MLazyDynamicComponent } from './components/lazy-dynamic/lazy-dynamic.component';
import {MDynamicService} from '@services/dynamic.service';


const routes: Routes = [
    {path: '', component: MLazyComponent},
];


@NgModule({
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [MLazyComponent],
    providers: [MDynamicService],
    declarations: [MLazyComponent, MLazyDynamicComponent],
    entryComponents: [MLazyDynamicComponent]
})
export class MLazyModule {}


