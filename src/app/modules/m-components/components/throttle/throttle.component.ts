import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {fromEvent} from 'rxjs/internal/observable/fromEvent';
import {auditTime} from 'rxjs/operators';

@Component({
    selector: 'm-throttle',
    templateUrl: './throttle.component.html',
    styleUrls: ['./throttle.component.less']
})
export class ThrottleComponent implements AfterViewInit {

    @ViewChild('testEl')
    testElRef: ElementRef;
    @ViewChild('testEl1')
    testElRef1: ElementRef;

    constructor(private elRef: ElementRef) {
    }

    ngAfterViewInit() {
        const element = this.elRef.nativeElement as HTMLElement;
        const cb = (e) => {
            console.log('throttle ', e);
        };

        // Variant 1
        // fromEvent(element, 'mousemove')
        //     .pipe(auditTime(1000))
        //     .subscribe(cb);


        // My Variant 1
        function throttle(func: (e: Event) => any, time: number) {
            let prevDate;

            return function(...args) {
                const context = this;
                const currentDate = +new Date();

                if (!prevDate) {
                    prevDate = +new Date();
                } else if (currentDate - prevDate > time) {
                    prevDate = null;
                    func.apply(context, args);
                }
            };
        }

        // My Variant 2
        // function throttle(func: (e: Event) => any, time: number) {
        //     let isThrottle = false;
        //     let context;
        //
        //     return function(...args) {
        //
        //         if (isThrottle) {
        //             context = this;
        //             return;
        //         }
        //
        //         isThrottle = true;
        //
        //         func.apply(context, args);
        //
        //         setTimeout(() => {
        //             isThrottle = false;
        //             context = null;
        //         }, time);
        //     };
        // }

        element.addEventListener('mousemove', throttle(cb, 1000));
    }

}
