import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {MProtectedLazyComponent} from './m-protected-lazy.component';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
    {path: '', component: MProtectedLazyComponent},
];


@NgModule({
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [MProtectedLazyComponent],
    declarations: [MProtectedLazyComponent]
})
export class MProtectedLazyModule {}


