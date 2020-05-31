import { Component, OnDestroy, OnInit } from "@angular/core";
import { domenToken, domenTokenDb } from "../../../shared/tokens/tokens";
import { HttpClient } from "@angular/common/http";
import {
    forkJoin,
    Observable,
    zip,
    of,
    Subscription,
    interval,
    combineLatest,
    asyncScheduler,
    merge,
    defer,
    from,
} from "rxjs";
import { mergeAll, observeOn } from "rxjs/operators";
import { concatMap, delay, map } from "rxjs/operators";

@Component({
    selector: "rxjs-example",
    template: `
        <h2>Rxjs Example</h2>
        {{ number }}

        <p *ngIf="_rxjsOnDestroyVisible">
            <rxjs-ondestroy></rxjs-ondestroy>
            <button (click)="_rxjsOnDestroyVisible = false">
                Remove component
            </button>
        </p>
    `,
})
export class RxjsExampleComponent implements OnInit, OnDestroy {
    public _rxjsOnDestroyVisible = true;

    interval: number;
    observerSubscription: Subscription;
    number = 1;
    private observer: Observable<any>;

    constructor(private _http: HttpClient) {}

    ngOnInit() {
        const self = this;

        // не делаю внутренние сабскрайбы
        // firstObservable$.pipe(
        //     take(1)
        // )
        //     .subscribe(firstValue => {
        //         secondObservable$.pipe(
        //             take(1)
        //         )
        //             .subscribe(secondValue => {
        //                 console.log(`Combined values are: ${firstValue} & ${secondValue}`);
        //             });
        //     });
        // а делаю так
        // firstObservable$.pipe(
        //     withLatestFrom(secondObservable$),
        //     first()
        // )
        //     .subscribe(([firstValue, secondValue]) => {
        //         console.log(`Combined values are: ${firstValue} & ${secondValue}`);
        //     });

        // this.observer = Observable.create((subscriber: Subscriber<any>) => {
        //     this.interval = window.setInterval(() => {
        //         subscriber.next(++this.number);
        //         console.log('observable number: ', this.number);
        //     }, 1000);
        // });
        //
        //
        // this.observerSubscription = this.observer.subscribe((data: number) => {
        //     this.number = data;
        // });

        // Запросы по нескольким id в порядке очереди приходят, сабскрйбится к каждому обзерваблу в отдельности,
        // дождется выполнения первого и лишь затем второго, сработает когда все придут
        const idsObservable$ = from([0, 1, 2]);

        // let idsObservableInOrder$ = idsObservable$.pipe(
        //     map((id) => {
        //         return self._http.get(`${domenToken}family${id}.json`)
        //     }),
        //     concatAll()
        // );
        //тоже что и

        // let idsObservableInOrder$ = idsObservable$.pipe(
        //     concatMap((id) => {
        //         return self._http.get(`${domenToken}family/families/${id}`);
        //     })
        // );
        //
        // idsObservableInOrder$.subscribe((data) => {console.log(data); });
        /*****************************************/

        // если нужно дождаться 1го и потом 2ой делай так
        // const queueObservable$ = this._http.get(`${domenTokenDb}mocks`).pipe(
        //     concatMap(
        //         (urls: any) =>
        //             self._http.get(`${domenTokenDb}${urls.familyUrl}`)
        //                 .pipe(
        //                     map((data) => ({urls, data}))
        //                 )
        //
        //     )
        // ).subscribe(({urls, data}) => {
        //     console.log('queueObservable$ first', urls);
        //     console.log('queueObservable$ second', data);
        // });

        // пример c finally
        // this.http.get(url, {withCredentials: true, responseType: "text"})
        //     .finally(() => {
        //
        //     })
        //     .subscribe(
        //         () => {},
        //         (error) => Observable.throw(error),
        //         () => {}
        //     );

        // const source = of(
        //     this._http.get(`${domenToken}family0.json`),
        //     this._http.get(`${domenToken}family1.json`),
        //     this._http.get(`${domenToken}family2.json`));

        // const concatedAll$ = source.pipe(concatAll());
        //
        // concatedAll$.subscribe((data) => {
        //    console.log(data);
        //    //(3) [{…}, {…}, {…}]
        //    //(3) [{…}, {…}, {…}]
        //    //(3) [{…}, {…}, {…}]
        // подписываемся к каждому обзервблу, когда заканчивается предыдущий и получаем для каждого console.log
        // })

        // const switchAll$ = source.pipe(switchAll());
        //
        // switchAll$.subscribe((data) => {
        //    console.log(data);
        //    //(3) [{…}, {…}, {…}] - только результат последнего запроса family2.json
        // })

        // const mergeAll$ = source.pipe(mergeAll());
        //
        // mergeAll$.subscribe((data) => {
        //     console.log(data);
        //     // (3) [{…}, {…}, {…}]
        //     //    //(3) [{…}, {…}, {…}]
        //     //    //(3) [{…}, {…}, {…}] - подряд выводит 3 массива
        // });

        // const combineAll$ = source.pipe(combineAll());
        //
        // combineAll$.subscribe((data) => {
        //     console.log(data);
        //     //(3) [Array(3), Array(3), Array(3)] - результат сразу 3 запроса в 1 ом
        // })

        const intervalOne$ = interval(1000);
        const intervalTwo$ = interval(3000);

        // когда хоть одно значение хоть у 1 обзервабла сработало выдает результат 2х, в начале подождет хотябы 1 результат всех обзервблов
        // combineLatest(intervalOne$, intervalTwo$)
        //     .subscribe(all => console.log('combineLatest ', all)); // [2, 0], [3, 0]...

        // ждет результат 3х обзерваблов и затем срабатывает, выдаст [[...],[...],[...]]
        // zip(
        //     this._http.get(`${domenToken}api/family/families/0`),
        //     this._http.get(`${domenToken}api/family/families/1`),
        //     this._http.get(`${domenToken}api/family/families/2`)
        // ).subscribe(all => console.log('zip ', all));

        //выдает результат 3х, когда тикнет хоть 1,
        // но не ждет пока все 3 выполняться, выдает результат [[...],[...],[...]],
        // в начале подождет хотябы 1 результат всех 3х обзервблов
        // combineLatest(
        //     this._http.get(`${domenToken}api/family/families/0`),
        //     this._http.get(`${domenToken}api/family/families/1`),
        //     this._http.get(`${domenToken}api/family/families/2`)
        // ).subscribe(all => console.log('combineLatest ', all));

        // выдаст подряд 3 массива с каждой family
        // merge(
        //     this._http.get(`${domenToken}api/family/families/0`),
        //     this._http.get(`${domenToken}api/family/families/1`),
        //     this._http.get(`${domenToken}api/family/families/2`)
        // ).subscribe(all => console.log('merge ', all)); // merge [{…}, {…}, {…}], merge [{…}, {…}, {…}], merge [{…}, {…}, {…}]

        // this._http.get(`${domenToken}family0.json`).pipe(
        //     combineLatest(this._http.get(`${domenToken}family1.json`), this._http.get(`${domenToken}family2.json`))
        // ).subscribe(all => console.log(all));

        // расписания
        // const o1 = of(1, 2).pipe(observeOn(asyncScheduler));
        // const o2 = of(10);
        //
        // combineLatest(o1, o2).subscribe((value) => {
        //     console.log('combineLatest value ', value); // сработает 2 раза, сперва выдаст [1, 10], затем [2, 10]
        // });

        // forkJoin([
        //     this._http.get(`${domenToken}family0.json`),
        //     this._http.get(`${domenToken}family1.json`),
        //     this._http.get(`${domenToken}family2.json`)
        // ]).subscribe(all => console.log(all)); // (3) [Array(3), Array(3), Array(3)] - результат сразу 3 запроса в 1 ом

        // https://www.youtube.com/watch?v=QfvwQEJVOig&feature=youtu.be&t=1h12s
    }

    ngOnDestroy() {
        if (this.observerSubscription) {
            this.observerSubscription.unsubscribe();
        }
        clearInterval(this.interval);
    }
}

// Создать кастомный оператор
// type Operator<I, O> = (in: Observable<I>) => Observable<O>;
//
// function countChars(): Operator<string, number> {
//     return (obs: Observable<string>) => {
//         return obs.pipe(map(str => str.length));
//     }
// }
//
// const strings$ = Observable.of(["1", "2"]);
//
// const charCount$ = strings$.pipe(countChars());

// .pipe(doOnSubscribe(() => {console.log("subscribed");}))
// const s = of([1, 2]);
//
// s.pipe(doOnSubscribe(() => {
//     console.log(123);
// })).subscribe((value) => {
//     console.log(value);
// });

export function doOnSubscribe<T>(
    onSubscribe: () => void
): (source: Observable<T>) => Observable<T> {
    return function inner(source: Observable<T>): Observable<T> {
        return defer(() => {
            onSubscribe();

            return source;
        });
    };
}
