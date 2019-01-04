import {Component, OnInit} from '@angular/core';
import {from, Observable, Observer} from 'rxjs';
import {share, shareReplay} from 'rxjs/internal/operators';

@Component({
    selector: 'rxjs-example2',
    templateUrl: './rxjs-example2.component.html'
})

export class RxjsExample2Component implements OnInit {
    public inputValue: string;
    public arr: string[] = ['Hi', 'rxjs', '!!!'];
    //создаю observable array
    public sequence: Observable<string> = from(this.arr);

    constructor() {
        console.log(this.sequence);
        this.sequence.subscribe((res: string) => console.log(res));
    }

    public addItemToArray(value) {
        this.arr.push(value);
        this.sequence.subscribe((res: string) => console.log(res));
    }

    ngOnInit() {
        let obs;

        const o: Observable<string> = Observable.create((observer: Observer<string>) => {
            obs = observer;
            observer.next('string');
        }).pipe(shareReplay(1)); // если просто share, то сабскрайберы не получат значений при подписке после next, а если shareReplay, то получат

        // TODO make shareReplay example
        setTimeout(() => {
            obs.next('string1');

            o.subscribe((string) => {
                console.log('subscribe in timeout after next ', string);
            });
        });

        o.subscribe((string) => {
            console.log('subscribe ', string);
        });

        o.subscribe((string) => {
            console.log('subscribe ', string);
        });
    }

}
