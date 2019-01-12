import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {combineAll, concatAll, map, mergeAll, take, takeUntil} from 'rxjs/operators';
import {combineLatest, interval, merge, of, Subject} from 'rxjs';

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
        const observable = interval(2000);
        const observable1 = interval(4000);
        const observable2 = of([]);

        // observable2.pipe(
        //     //takeUntil(this.onDestroy$) // ERROR!!! если поставить сюда то сабскрайб не умрет!!!!! так не делать
        //     map(() => observable1),
        //     mergeAll(),
        //     takeUntil(this.onDestroy$) // всегда ставим в конец, тогда отписка произойдет
        // ).subscribe((data) => console.log('onDestroy mergeAll & takeUntil ', data)); // 0,1,2,3... каждые 2 секунды

        // observable.pipe(
        //     //takeUntil(this.onDestroy$) // ERROR!!! если поставить сюда то сабскрайб не умрет!!!!! так не делать
        //     map(() => observable1),
        //     concatAll(),
        //     takeUntil(this.onDestroy$) // всегда ставим в конец, тогда отписка произойдет
        // ).subscribe((data) => console.log('onDestroy concatAll & takeUntil ', data)); // 0,1,2,3,4,5

        // combineAll - работает очень интересно, когда observable закончит, combineAll подписывается ко всем
        // внутренним обзервблам и использует combineLatest стратегию. Но в отличии от стандартного combineLatest тикнет вначале observable не дождавшись пока observable1 сработает хоть раз
        // observable2.pipe(
        //     //takeUntil(this.onDestroy$) // ERROR!!! если поставить сюда то сабскрайб не умрет!!!!! так не делать
        //     take(1),
        //     map(() => merge(observable, observable1)),
        //     combineAll(),
        //     takeUntil(this.onDestroy$) // всегда ставим в конец, тогда отписка произойдет
        // ).subscribe((data) => console.log('onDestroy combineAll & takeUntil ', data)); // 0,1,2,3,4,5

        // combineLatest(observable, observable1).pipe(
        //     takeUntil(this.onDestroy$)
        // ).subscribe((data) => console.log('onDestroy combineLatest ', data));
        //
        // observable
        //     .pipe(
        //         takeUntil(this.onDestroy$)
        //     )
        //     .subscribe(
        //         (data) => console.log('onDestroy takeUntil ', data)
        //     );
    }

    ngOnDestroy() {
        this.onDestroy$.next();
        this.onDestroy$.complete();
        this.onDestroy$ = null;
    }
}
