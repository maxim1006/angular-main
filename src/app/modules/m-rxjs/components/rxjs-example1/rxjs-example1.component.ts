import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { fromEvent, Subject, of, from, range, interval } from 'rxjs';
import {
    debounceTime,
    takeUntil,
    distinctUntilChanged,
    take,
    scan,
    reduce,
    map,
    mapTo,
    flatMap,
    switchMap, exhaustMap, pluck, delay, timeout, catchError, retry, tap, retryWhen, share, shareReplay
} from 'rxjs/operators';
import {Observable, throwError, Observer} from "rxjs";
import {observable} from "rxjs/internal-compatibility";

@Component({
    selector: 'rxjs-example1',
    template: `
        <h2>Rxjs Example 1</h2>
        <input #input type='text' style='border: 1px solid;'/>

        <button (click)='_unsubscribeInputEvent()'>Unsubscribe input event</button>

    `
})

export class RxjsExample1Component implements AfterViewInit, OnDestroy {
    @ViewChild('input')
    private inputRef: ElementRef;

    private destroy$: Subject<any> = new Subject();

    public ngAfterViewInit(): void {
        const input = this.inputRef.nativeElement;

        fromEvent(input, 'input')
        .pipe(
            debounceTime(500),
            takeUntil(this.destroy$)
        )
        .subscribe((event) => {
            console.log(`fromEvent(input, 'input') `, event['target'].value);
        });

        // of(1,2,3).pipe(scan((total, current) => {
        //     console.log(total, current); //результат будет 3 раза: 1 затем 1, 2, затем, 3, 3
        //
        //     return total + current
        // })).subscribe((value) => {
        //     console.log("scan subscribe ", value); // 1 затем 3 затем 6
        // });
        //
        // of(1,2,3).pipe(reduce((total, current) => {
        //     console.log(total, current); //результат будет 2 раза: 1, 2, затем, 3, 3
        //
        //     return total + current
        // })).subscribe((value) => {
        //     console.log("reduce subscribe ", value); // только 6
        // });

        // of([1, 2, 3])
        // .subscribe((event) => {
        //     console.log('of([1, 2, 3]) ', event); // [1, 2, 3]
        // });

        // from([1, 1, 2, 3])
        // .pipe(distinctUntilChanged())
        // .subscribe((event) => {
        //     console.log('from([1, 1, 2, 3]) ', event); // 1, 2, 3
        // });

        // from([
        //     {name: "file1"},
        //     {name: "file2"},
        //     {name: "file3"}
        // ]).subscribe((data) => {console.log("from ", data);}) // {name: "file1"}, затем {name: "file2"}, затем {name: "file3"}

        // from('str')
        // .subscribe((event) => {
        //     console.log('from(str) ', event); // s, t, r
        // });

        // range(1, 10)
        // .subscribe((event) => {
        //     console.log('range(1, 10) ', event); // 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
        // });

        // range(1, 10)
        // .pipe(take(5))
        // .subscribe((event) => {
        //     console.log('range(1, 10) .pipe(take(5)) ', event); // 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
        // });

        // Observable.create((observer: Observer<any>) => {
        //     observer.next({name: "Max", age: 30});
        //     observer.next({name: "Maximus", age: 31});
        // })
        //     .pipe(pluck("name"))
        //     .subscribe((value) => {
        //         console.log("pluck value ", value); //Max затем Maximus
        //     });

        // of(1,2,3).pipe(map((value) => {
        //     console.log("map ", value); // 1 затем 2 затем 3
        //     return value;
        // })).subscribe((value) => {
        //     console.log("map subscribe ", value); // 1 затем 2 затем 3
        // });
        //
        // of(1,2,3).pipe(mapTo("Max")).subscribe((value) => {
        //     console.log("map subscribe ", value); // Max затем Max затем Max
        // });

        // flatMap - создает потоки обзервеблов, в данном примере на каждый клик будет создан
        //обзервбл и в параллели выполнен, 3 клика, 3 потока, за которыми будем следить
        // fromEvent(document, "click"); flatMap === mergeMap
        //     .pipe(flatMap(_ => interval(1000)))
        //     .subscribe((value) => {
        //         console.log("flatMap subscribe ", value); 0,1,2,3 click 4,4,5,5
        //     });

        // в отличие от flatMap не параллельно запускает потоки, а уничтожает предыдущий заменяя его новым
        // fromEvent(document, "click")
        //     .pipe(switchMap(_ => interval(1000)))
        //     .subscribe((value) => {
        //         console.log("switchMap subscribe ", value); // 0,1,2,3 click 0,1,2,3
        //     });

        // fromEvent(document, "click")
        //     .pipe(exhaustMap(_ => interval(1000)))
        //     .subscribe((value) => {
        //         console.log("exhaustMap subscribe ", value); // реагирует только на 1ый клик, на остальные нет, можно использовать для запроса на сервер
        //     });

        // of()
        //     .pipe(
        //         delay(3000),
        //         timeout(1000),
        //         catchError((error) => {
        //             console.log("catchError ", error);
        //             return of();
        //         })
        //     )
        //     .subscribe((value) => {
        //         console.log("catchError subscribe ", value);
        //     })

        // interval(1000)
        //     .pipe(
        //         switchMap((value) => {
        //             if (value > 3) {
        //                 return throwError("value > 3");
        //             }
        //             return of(value);
        //         }),
        //         retry(1)
        //     )
        //     .subscribe((value) => {
        //         console.log("throwError and subscribe retry", value);
        //     });

        // interval(1000)
        //     .pipe(
        //         switchMap((value) => {
        //             if (value > 3) {
        //                 return throwError("value > 3");
        //             }
        //             return of(value);
        //         }),
        //         retryWhen(errorObservable => errorObservable.pipe(delay(3000)))
        //     )
        //     .subscribe((value) => {
        //         console.log("throwError and subscribe retryWhen", value);
        //     });


        // // упращенная схема multicast
        // function multicast(observable: Observable<any>) {
        //     const subject = new Subject();
        //     observable.subscribe(subject);
        //     return subject;
        // }

        // let o = interval(1000)
        //     .pipe(
        //         tap((value) => {
        //             console.log("interval tap ", value);
        //         }),
        //         share() // shareReplay(2) - тоже, но говорим, что 2 оставляем в любом случае
        //     );
        //
        // o.subscribe();
        // o.subscribe();
        // o.subscribe();
        // o.subscribe();
    }

    public ngOnDestroy(): void {
        this.destroySubscribers();
    }

    /** @internal */
    public _unsubscribeInputEvent(): void {
        this.destroySubscribers();
    }

    private destroySubscribers(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
