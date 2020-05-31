import { isPlatformBrowser } from "@angular/common";
import {
    Inject,
    Injectable,
    OnDestroy,
    Optional,
    PLATFORM_ID,
} from "@angular/core";
import { SwPush, SwUpdate } from "@angular/service-worker";
import { interval, Subject } from "rxjs";
import { filter, take, takeUntil } from "rxjs/operators";

// В app.component самый простой способ проверки, тут сервис с примером кастомного попапа (можно вызвать вместо confirm)
// с каунтером который досчитает до 6 часов и перепроверит ничего ли не поменялось
// а также не забыть вызвать checkForUpdates
@Injectable({
    providedIn: "root",
})
export class SwUpdateService implements OnDestroy {
    destroy = new Subject();
    destroy$ = this.destroy.asObservable();

    constructor(
        private swUpdate: SwUpdate,
        @Inject(PLATFORM_ID) private platformID: object,
        @Optional() private swPush: SwPush
    ) {
        if (this.swUpdate.isEnabled && isPlatformBrowser(this.platformID)) {
            // poll the service worker to check for updates
            interval(6 * 60 * 60)
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => this.swUpdate.checkForUpdate());
        }
    }

    // Called from app.components.ts constructor
    checkForUpdates(): void {
        if (this.swUpdate.isEnabled) {
            let reloaded = false;
            this.swUpdate.available
                .pipe(
                    filter(event => !!event),
                    take(1)
                )
                .toPromise()
                .then(event => {
                    this.promptUser(event);
                });
            this.swUpdate.activated
                .pipe(
                    filter(event => !!event),
                    take(1)
                )
                .toPromise()
                .then(() => {
                    if (!reloaded) {
                        reloaded = false;
                        document.location.reload(true);
                    }
                });
        }
    }

    update(): Promise<any> {
        return this.swUpdate.activateUpdate();
    }

    ngOnDestroy(): void {
        this.destroy.next();
    }

    // If there is an update, promt the user
    private promptUser(e): void {
        if (e.available && confirm("A new version of the app is available")) {
            this.update(); // update service worker and reload
        }
    }
}
