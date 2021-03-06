import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class PageLoaderService {
    public pageLoading = false;
    public pageLoadingStart = true;
    private _deactivatedRoute = false;
    private _visitedRoutesCache: any = {};

    activateRoute(event) {
        const constructorName = event.constructor.name;

        if (!this._visitedRoutesCache[constructorName]) {
            this._visitedRoutesCache[constructorName] = constructorName;

            if (!this._deactivatedRoute) {
                this.pageLoading = true;
                this._deferLoaders(false, 300);
            } else {
                this._deferLoaders(false, 50);
            }
        } else {
            deferLoading(this.pageLoading, false, 0);
            this.pageLoadingStart = false;
        }
    }

    deactivateRoute() {
        this._deactivatedRoute = true;
        this.pageLoadingStart = true;
        deferLoading(this.pageLoading, true, 0);
    }

    _deferLoaders(value: boolean, time: number) {
        setTimeout(() => {
            this.pageLoading = value;
            this.pageLoadingStart = value;
        }, time);
    }
}

/*Helpers*/
function deferLoading(param: boolean, value: boolean, time) {
    setTimeout(() => {
        param = value;
    }, time);
}
