import {Component, OnInit, Input} from '@angular/core';

@Component({
        selector: 'm-loader',
        templateUrl: './m-loader.component.html'
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

         if (this._isLoading) { return; }

         this._timeout = window.setTimeout(() => {
             this._isLoading = true;
             this.cancelTimeout();
         }, this.delay);
    }

    constructor() {}

    ngOnInit() {}

    private cancelTimeout() {
        clearTimeout(this._timeout);
        this._timeout = null;
    }

}
