import {Injectable} from '@angular/core';
import {CanActivate, CanDeactivate} from '@angular/router';
import {MAdminComponent} from './admin.component';

@Injectable()
export class MAdminGuardService implements CanActivate, CanDeactivate<MAdminComponent> {
    canActivate(component: MAdminComponent) {
        return JSON.parse(localStorage.getItem('admin'));
    }

    canDeactivate(component: MAdminComponent) {
        return !JSON.parse(localStorage.getItem('admin'));
    }
}
