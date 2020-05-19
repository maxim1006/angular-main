import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {CanActivate, CanDeactivate} from '@angular/router';
import {MAdminComponent} from './admin.component';
import {isPlatformBrowser} from '@angular/common';

@Injectable()
export class MAdminGuardService implements CanActivate, CanDeactivate<MAdminComponent> {
    constructor(@Inject(PLATFORM_ID) private platformId: Object,) {
    }

    canActivate() {
        if (isPlatformBrowser(this.platformId)) {
            return JSON.parse(localStorage.getItem('admin'));
        }
    }

    canDeactivate() {
        if (isPlatformBrowser(this.platformId)) {
            return !JSON.parse(localStorage.getItem('admin'));
        }
    }
}
