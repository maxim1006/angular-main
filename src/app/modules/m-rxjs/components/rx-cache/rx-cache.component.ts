import {Component, Injectable, OnInit} from '@angular/core';
import {ConnectableObservable, defer, from, Observable, of, Subject} from 'rxjs';
import {map, multicast, refCount, share} from 'rxjs/operators';
import {publishReplay} from 'rxjs/internal/operators/publishReplay';
import {publish} from 'rxjs/internal/operators/publish';
import {HttpClient} from '@angular/common/http';
import {domenTokenDb} from '../../../shared/tokens/tokens';
import {RxCacheService} from './rx-cache.service';

@Component({
    selector: 'rx-cache',
    template: `
        Cache and multicast
    `
})
export class RxCacheComponent implements OnInit {

    constructor(private rxCacheService: RxCacheService) {
        // Это получше
        this.rxCacheService.getFamily().subscribe(data => console.log(data));
        this.rxCacheService.getFamily().subscribe(data => console.log(data));
        this.rxCacheService.getFamily().subscribe(data => console.log(data));
        this.rxCacheService.clearCache();
        this.rxCacheService.getFamily().subscribe(data => console.log(data));
    }


    public ngOnInit() {

        // изза defer вызовется 2 раза так как сабджект 2 раза подписывается, результат
        // observer a: 72
        // observer b: 72
        // observer a: complete
        // observer b: complete
        const source = defer(() => of(
            Math.floor(Math.random() * 100)
        ));

        function random() {
            return Math.floor(Math.random() * 100);
        }

        function observer(name: string) {
            return {
                next: (value: number) => console.log(`observer ${name}: ${value}`),
                complete: () => console.log(`observer ${name}: complete`)
            };
        }

        // Кейс 1 где просто сабджект
        // const subject = new Subject<number>();
        // subject.subscribe(observer('a'));
        // subject.subscribe(observer('b'));
        // source.subscribe(subject);

        // Кейс 2 - если хотим сделать multicast (горячий обзервбл)
        function multicastCustom<T>(source: Observable<T>) {
            const subject = new Subject<T>();
            source.subscribe(subject);
            return subject;
        }

        const m = multicastCustom(source);
        m.subscribe(observer('a')); // complete a
        m.subscribe(observer('b')); // complete b
        // так как при подписке subject получает next и complete перед подпиской обзервбла, поэтому только комплит,
        // поэтому есть ConnectableObservable который с помощью метода connect контролирует подписку
        // as ConnectableObservable<number> - изза ошибки в тайпскрипт

        const m2 = source.pipe(multicast(() => new Subject<number>())) as ConnectableObservable<number>;
        m2.subscribe(observer('c'));
        m2.subscribe(observer('d'));
        m2.connect(); // когда вызываю коннект - саджект подписывается и только потом получает нотификции

        // refCount - отключит обзербл как только он выполнится несмотря на остальные подсписки сабджекта, те делает
        // обычный флоу
        const m3 = source.pipe(multicast(() => new Subject<number>()), refCount()) as ConnectableObservable<number>;
        m3.subscribe(observer('e')); // complete a
        m3.subscribe(observer('f')); // complete b
        /******************************/

        // Publish - The publish operator is a thin wrapper around the multicast operator.
        // It calls multicast, passing a Subject.
        // могу передать publish(), publishBehavior(), publishReplay()
        const p = source.pipe(publish(), /* либо тут использую refCount() */) as ConnectableObservable<number>;
        p.subscribe(observer('g'));
        p.connect(); // либо тут коннект (вместо refCount) результат тот же, те 1 сработает дальше только complete
        p.subscribe(observer('h'));
        setTimeout(() => p.subscribe(observer('i')), 10);
        // observer g: 31
        // observer g: complete
        // observer h: complete
        // observer i: complete

        // Share - делает горячий обзервбл как publish
        const s = source.pipe(share());
        s.subscribe(observer('j'));
        s.subscribe(observer('k'));


        // Кеширование
        const observable$ = from(['first', 'last']).pipe(
            publishReplay(1),
            refCount()
        );

        // refCount() keeps track of all subscribers so that it can unsubscribe from
        // the original source when all the subscribers are gone.

// First time subscribing, we get both values
        observable$.subscribe(data => console.log(data));

// Second time subscribing, we get the latest value
        observable$.subscribe(data => console.log(data));
        observable$.subscribe(data => console.log(data));
        observable$.subscribe(data => console.log(data));
        // first
        // last
        // last
        // last
        // last
    }
}


