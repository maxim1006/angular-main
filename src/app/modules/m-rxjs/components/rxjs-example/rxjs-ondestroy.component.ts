import { Component, OnDestroy, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { combineAll, concatAll, map, mergeAll, take, takeUntil } from "rxjs/operators";
import { combineLatest, fromEvent, interval, merge, of, Subject } from "rxjs";

@Component({
    selector: "rxjs-ondestroy",
    template: " <h2>Rxjs OnDestroy example</h2> ",
})
export class RxjsOnDestroyComponent implements OnInit, OnDestroy {
    private onDestroy$ = new Subject<void>();

    ngOnInit() {
        const observable = interval(2000);
        const observable2 = of([]);

        observable.pipe(takeUntil(this.onDestroy$)).subscribe(data => console.log("onDestroy takeUntil ", data));

        observable2
            .pipe(
                map(() => observable),
                mergeAll(),
                takeUntil(this.onDestroy$) // always at the end
            )
            .subscribe(data => console.log(data));
    }

    ngOnDestroy() {
        if (this.onDestroy$) {
            this.onDestroy$.next();
            this.onDestroy$.complete();
            this.onDestroy$ = null;
        }
    }
}
