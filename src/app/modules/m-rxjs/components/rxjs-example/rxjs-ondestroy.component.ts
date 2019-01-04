import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {takeUntil} from 'rxjs/operators';
import {interval, Subject} from 'rxjs';

@Component({
    selector: 'rxjs-ondestroy',
    template: `
        <h2>Rxjs OnDestroy example</h2>
    `
})

export class RxjsOnDestroyComponent implements OnInit, OnDestroy {
    private onDestroy$ = new Subject<void>();

    constructor(private _http: HttpClient) {                  
    }

    ngOnInit() {
        const self = this,
            observable = interval(1000);

        observable
            .pipe(
                takeUntil(this.onDestroy$)
            )
            .subscribe(
                () => console.log('onDestroy tick')
            );
    }

    ngOnDestroy() {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }
}
