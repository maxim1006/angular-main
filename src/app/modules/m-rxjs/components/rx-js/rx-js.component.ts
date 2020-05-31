// холодные обзервеблы, все подписавшиеся после первого next вызовутся по умолчанию, а горячие вызовутся все, только подписавшиеся после 1го next и пошарят 1 данные, также горячие сабскрайберы сработают только на то что произошло после сабскрипшина, а холодные на то что произошло до сабскрипшена тоже сработают. Каждый сабскайб обновляет функцию в  Observable.create(вот эта функция триггерится каждый раз))

import { Component, OnInit } from "@angular/core";
import { domenToken } from "../../../shared/tokens/tokens";
import { HttpClient } from "@angular/common/http";
import {
    AsyncSubject,
    BehaviorSubject,
    from,
    Observable,
    Observer,
    of,
    ReplaySubject,
    Subject,
    Subscriber,
    throwError,
} from "rxjs";
import {
    catchError,
    finalize,
    multicast,
    publishReplay,
    refCount,
    share,
} from "rxjs/operators";
import { doOnSubscribe } from "../rxjs-example/rxjs-example.component";

@Component({
    selector: "rx-js",
    template: `
        <p (click)="onClick()">Click me</p>
        {{ numberObservable | async }}
    `,
})
export class RxJsComponent implements OnInit {
    numberObservable: Observable<any>;
    subscription: any;
    number = 1;
    private subscriber: Subscriber<number>;
    private subject: Subject<any> = new Subject<any>();

    constructor(private _http: HttpClient) {}

    ngOnInit() {
        this.numberObservable = Observable.create(
            (subscriber: Subscriber<any>) => {
                // эта функция будет отрабатывать каждый раз когда происходит subscription, поэтому останется только последний (в холодных обзервеблах)
                this.subscriber = subscriber;
                this.subscriber.next(this.number);

                // this.subscriber.complete(); //после этого те кто подписался не отработают

                // это для примера работы с холодным обзервеблом, через замыкание выведутся все сабскрипшены
                // setTimeout(() => {
                //     subscriber.next(this.number);
                // }, 3000);

                return () => {
                    console.log("rx-js unsubscribed in cold observable");
                };
            }
        ).pipe(share());

        // если не будет хоть 1 сабскайбера, то this.subscriber.next(number) не сработает, | async - это тоже что и subscribe, только автоматом через view

        // let observableComplete$ = new Observable((observer: Observer<any>) => {
        //     observer.next(1);
        //
        //     // observer.error("error");
        //     // observer.complete();
        //
        //     return () => {
        //         console.log("observableComplete return");
        //     };
        // })
        //     .pipe(
        //         catchError((e) => throwError("observableComplete$ error ", e)),
        //         finalize(() => console.log("observableComplete$ finally"))
        //     );

        // let observableComplete1$ = this._http.get(`${domenToken}mocks.json`);
        //
        // observableComplete1$.subscribe({
        //     next() {
        //         console.log("observableComplete1$ next");
        //     },
        //     error() {
        //         console.log("observableComplete1$ error");
        //     },
        //     complete() {
        //         console.log("observableComplete1$ complete");
        //     }
        // });

        // let observableCompleteSubscription = observableComplete$.subscribe({
        //     next(data) {
        //         console.log("observableComplete data ", data);
        //     },
        //     error(e) {
        //         console.log("observableComplete error ", e);
        //     },
        //     complete() {
        //         console.log("observableComplete complete");
        //     }
        // });
        //
        // setTimeout(() => {
        //     observableCompleteSubscription.unsubscribe();
        // }, 2000);

        /********************Subject**********************/
        // this.subject.subscribe({
        //     next(data) {console.log("Subject data ", data);},
        //     error(e) {console.log("Subject error ", e);},
        //     complete() {console.log("Subject complete ");},
        // });

        // this.subject.next("some data");
        // this.subject.error("some error");

        // this.subject.complete();
        // this.subject.next("some data"); //не будет вызван

        // let subject = new BehaviorSubject(0); // будет вызван 1ый раз без next с инит значением 0
        // subject.value - будет всегда содержать текущее значение, отсюда удобно забирать
        //
        // subject.subscribe({
        //     next: (v) => console.log('BehaviorSubject A: ' + v)
        // });
        //
        // subject.next(1);
        // subject.next(2);
        // //
        // subject.subscribe({
        //     next: (v) => console.log('BehaviorSubject B: ' + v)
        // });
        // subject.next(3);

        // let replaySubject = new ReplaySubject(2);
        // // либо по времени
        // // let replaySubject = new ReplaySubject(Number.POSITIVE_INFINITY, 3000);
        //
        // replaySubject.subscribe((value) => {
        //     console.log("replaySubject A ", value); // 1 затем 2 затем 3
        // });
        //
        // replaySubject.next(1);
        // replaySubject.next(2);
        // replaySubject.next(3);
        //
        // replaySubject.subscribe((value) => {
        //     console.log("replaySubject B ", value); // тут получу только 2 последних значения: 2 затем 3
        // });

        // let asyncSubject = new AsyncSubject();
        // // либо по времени
        // // let asyncSubject = new ReplaySubject(Number.POSITIVE_INFINITY, 3000);
        //
        // asyncSubject.subscribe((value) => {
        //     console.log("asyncSubject A ", value); // 3
        // });
        //
        // asyncSubject.next(1);
        // asyncSubject.next(2);
        // asyncSubject.next(3);
        //
        // asyncSubject.subscribe((value) => {
        //     console.log("asyncSubject B ", value); // 3
        // });
        //
        // asyncSubject.complete(); // только когда сделаю complete, то сабджект вернет последнее значение
        /******************** /Subject **********************/

        // finalyze проследить все отписки
        // const finalizeO = of([1, 2]);
        //
        // const finalizeOSubscription = finalizeO.pipe(
        //     finalize(() => {
        //         console.log(`finalizeO is unsubscribed`);
        //     })
        // ).subscribe((value) => {
        //     console.log(`finalizeO subscribe `, value);
        // });
        //
        // finalizeOSubscription.unsubscribe();

        // finalize Subject
        // const s = new BehaviorSubject([1, 2]).pipe(
        //     finalize(() => {console.log(`s is unsubscribed`); }),
        //     // share() // так вызовется только 1 раз в сабскрайбах коллбек
        //
        //     // а так в каждой подписке выполнится коллбек
        //     publishReplay(1),
        //     refCount()
        // );
        //
        // const subscr1 = s.subscribe(val => console.log(val));
        // const subscr2 = s.subscribe(val => console.log(val));
        //
        // subscr1.unsubscribe();
        // subscr2.unsubscribe();
    }

    ngAfterViewInit() {
        //положил их сюда, для того, чтобы горячий обзервебл отрендерил тот что во вью. Если бы положил в onInit, то сработал бы только o1, так как подписка произошла после того как вызвался первый next, а в этом случае горячий вызывает только первый сабскайбер
        this.numberObservable.subscribe(data => {
            console.log(data, " o1");
        });

        this.numberObservable.subscribe(data => {
            console.log(data, " o2");
        });

        this.numberObservable.subscribe(data => {
            console.log(data, " o3");
        });

        setTimeout(() => {
            this.numberObservable.subscribe(data => {
                console.log(data, " o4");
            });
        }, 2000);
    }

    onClick() {
        //в горячих обзервеблах this.subscriber - один на все сабскрипшены, а в холодных 1 сабскайбер на 1 сабскрипшен
        this.subscriber.next(++this.number);
    }
}
