import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {fromEvent} from 'rxjs';
import {debounce, debounceTime} from 'rxjs/operators';

@Component({
    selector: 'm-debounce',
    templateUrl: './debounce.component.html',
    styleUrls: ['./debounce.component.less']
})
export class DebounceComponent implements AfterViewInit {

    constructor(private elRef: ElementRef) {
    }

    ngAfterViewInit() {
        const element = this.elRef.nativeElement as HTMLElement;
        const cb = (e) => {
            console.log('debounce ', e);
        };

        // fromEvent(element, 'mousemove')
        //     .pipe(debounceTime(1000))
        //     .subscribe(cb);

        function debounce(func: (e: Event) => any, time: number = 0) {
            let timeout;

            return function (...args) {
                const context = this;

                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    func.apply(context, args);
                }, time);
            };
        }

        element.addEventListener('mousemove', debounce(cb, 1000));
    }

}
