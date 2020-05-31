import { Component, OnInit, Input, PLATFORM_ID, Inject } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

@Component({
    selector: "m-loader",
    templateUrl: "./m-loader.component.html",
})
export class MLoaderComponent implements OnInit {
    private _timeout: number;

    public _isLoading = false;

    @Input()
    public delay = 300;

    @Input()
    public text: string;

    @Input()
    public modifier: string;

    @Input()
    public set isActive(value: boolean) {
        if (!value) {
            this.cancelTimeout();
            this._isLoading = false;
            return;
        }

        if (this._isLoading) {
            return;
        }

        if (isPlatformBrowser(this.platformId)) {
            this._timeout = window.setTimeout(() => {
                this._isLoading = true;
                this.cancelTimeout();
            }, this.delay);
        }
    }

    constructor(@Inject(PLATFORM_ID) private platformId: Record<string, any>) {}

    ngOnInit() {}

    private cancelTimeout() {
        clearTimeout(this._timeout);
        this._timeout = null;
    }
}
