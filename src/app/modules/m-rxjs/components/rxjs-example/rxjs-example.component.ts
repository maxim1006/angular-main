import {Component, OnDestroy, OnInit} from '@angular/core';
import {domenToken, domenTokenDb} from "../../../shared/tokens/tokens";
import {HttpClient} from "@angular/common/http";
import {forkJoin, Observable, zip, of, Subscription, interval, combineLatest, asyncScheduler} from "rxjs/index";
import {mergeAll, observeOn} from 'rxjs/operators';
import {concatMap, delay, map} from "rxjs/internal/operators";

@Component({
    selector: 'rxjs-example',
    template: `
        <h2>Rxjs Example</h2>
        {{number}}
        
        <p *ngIf="_rxjsOnDestroyVisible">
            <rxjs-ondestroy></rxjs-ondestroy>  <button (click)="_rxjsOnDestroyVisible = false">Remove component</button>
        </p>
        
    `
})

export class RxjsExampleComponent implements OnInit, OnDestroy {
    public _rxjsOnDestroyVisible: boolean = true;

    interval: number;
    observerSubscription: Subscription;
    number:number = 1;
    private observer: Observable<any>;

    constructor(private _http: HttpClient) {
    }

    ngOnInit() {

        let self = this;

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
        // let idsObservable$ = Observable.from([0,1,2]);

        // let idsObservableInOrder$ = idsObservable$.pipe(
        //     map((id) => {
        //         return self._http.get(`${domenToken}family${id}.json`)
        //     }),
        //     concatAll()
        // );
        //тоже что и

        // let idsObservableInOrder$ = idsObservable$.pipe(
        //     concatMap((id) => {
        //         return self._http.get(`${domenToken}family${id}.json`)
        //     })
        // );
        //
        // idsObservableInOrder$.subscribe((data) => {console.log(data);});
        /*****************************************/


        // если нужно дождаться 1го и потом 2ой делай так
        let queueObservable$ = this._http.get(`${domenTokenDb}mocks`).pipe(
            concatMap(
                (urls: any) =>
                    self._http.get(`${domenTokenDb}${urls.familyUrl}`)
                        .pipe(
                            map((data) => {return {urls, data}})
                        )

            )
        ).subscribe(({urls, data}) => {
            console.log("queueObservable$ first", urls);
            console.log("queueObservable$ second", data);
        });


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



        const source = of(
            this._http.get(`${domenToken}family0.json`),
            this._http.get(`${domenToken}family1.json`),
            this._http.get(`${domenToken}family2.json`));

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

        // когда хоть одно значение хоть у 1 обзервабла сработало выдает результат 2х
        // intervalOne$.pipe(
        //      combineLatest(
        //         intervalTwo$
        //     )).subscribe(all => console.log('combineLatest ', all));

        // ждет результат 2х обзерваблов и затем срабатывает, выдаст [[...],[...]]
        zip(this._http.get(`${domenToken}api/family/families/0`),
            this._http.get(`${domenToken}api/family/families/1`)
        ).subscribe(all => console.log('zip ', all));

        //`
        // //либо с запросами
        // Observable.combineLatest(
        //     this._http.get(`${domenToken}family0.json`),
        //     this._http.get(`${domenToken}family1.json`),
        //     this._http.get(`${domenToken}family2.json`)
        // ).subscribe(all => console.log(all));

        // this._http.get(`${domenToken}family0.json`).pipe(
        //     combineLatest(this._http.get(`${domenToken}family1.json`), this._http.get(`${domenToken}family2.json`))
        // ).subscribe(all => console.log(all));


        // расписания
        const o1 = of(1,2).pipe(observeOn(asyncScheduler));
        const o2 = of(10);

        combineLatest(o1, o2).subscribe((value) => {
            console.log("combineLatest value ", value);
        });



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

// export function doOnSubscribe<T>(onSubscribe: () => void): (source: Observable<T>) =>  Observable<T> {
//     return function inner(source: Observable<T>): Observable<T> {
//         return defer(() => {
//             onSubscribe();
//
//             return source;
//         });
//     };
// }
