import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {MAdminComponent} from "./m-admin.component";
import {MAdminGuardService} from "./m-admin-guard.service";
import {AdminIdComponent} from "./components/admin-id.component";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAdminPopupComponent} from "./components/admin-popup.component";
import {RouterModule, Routes} from "@angular/router";
import {MRxjsComponent} from "../m-rxjs/m-rxjs.component";


const routes: Routes = [
    {
        path: "admin",
        component: MAdminComponent,
        children: [
            {
                path: "",
                pathMatch: "full",
                redirectTo: "default"
            },
            {
                path: 'default',
                component: AdminIdComponent,
                data: {
                    title: "Admin"
                },
            },
            {path: ':id', component: AdminIdComponent},
            {
                path: 'adminPopup',
                component: MAdminPopupComponent,
                outlet: "adminPopup"
            }
        ]
    }
];


@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        BrowserAnimationsModule,
        RouterModule.forChild(routes),
    ],
    declarations: [
        MAdminComponent,
        AdminIdComponent,
        MAdminPopupComponent
    ],
    providers: [MAdminGuardService]
})
export class MAdminModule {}
