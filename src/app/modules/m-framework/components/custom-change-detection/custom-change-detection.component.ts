//By default, Angular Change Detection works by checking if the value of template expressions have changed. This is done for all components.

//By default, Angular does not do deep object comparison to detect changes, it only takes into account properties used by the template

/*
* OnPush strategy the change detection happens for a component if:

 a bound event is received (click) on the component itself.
 an @Input() was updated (as in the ref obj changed)
 | async pipe received an event
 change detection was invoked "manually"

 http://stackoverflow.com/questions/34827334/triggering-angular2-change-detection-manually
*
*
* ApplicationRef.tick (same as setTimeout()), and zone.run() cause change detection on the whole application. Also event listeners added within Angular or by Angular (using view bindings or @HostBinding() cause change detectionf for the whole application.

ChangeDetectorRef.detectChanges runs change detection for a specific component (and its descendants if applicable, for example because of input bindings)


* */

import {
    ApplicationRef,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    NgZone,
    OnInit,
    ViewChild,
} from "@angular/core";

@Component({
    selector: "custom-change-detection",
    templateUrl: "custom-change-detection.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush, //если проставить это, то не будет changeDetection, хотя а2 клик сработает, а сеттаймаут и браузер клик не сработает. Стратегия не наследуюется, поэтому должен и на этом элементе и на детях проставить эту стратегию
})
export class CustomChangeDetectionComponent implements OnInit {
    obj: { name: number | string };
    name: string;

    @ViewChild("inner") inner;

    constructor(
        private cdr: ChangeDetectorRef,
        private appRef: ApplicationRef,
        private ngZone: NgZone
    ) {
        //для оптимизации приложения можно использовать хак при отключенных зонах
        // setInterval(() => {
        //     appRef.tick();
        // }, 1000/60);
    }

    ngOnInit() {
        this.obj = {
            name: 1,
        };

        // Events, a2 & browser - click, submit, …
        // XHR - Fetching data from a remote server
        // Timers - setTimeout(), setInterval()
        setTimeout(() => {
            //this.cdr.detach(); //отключить все детекты изменений
            this.obj.name = 2;
            this.name = "Max";
            // this.cdr.markForCheck(); //если не поставить, то при ChangeDetectionStrategy.OnPush не сработает
        }, 1000);

        document
            .querySelector("#customChangeDetectionComponentHeader")
            .addEventListener("click", () => {
                this.obj.name = "browser click";
                console.log(this.inner.obj);
                // this.appRef.tick();
                // this.ngZone.run(() => {
                //     this.obj.name = "browser click";
                // });
                //this.cdr.markForCheck(); //marks the path from our component until root and then starts changeDetection on that path. использую если есть onPush
                //this.cdr.detectChanges(); //после отключения детектов сделать кастомный триггер изменений, также используется если нужно победить ошибку об изменении перед инициализацией
            });
    }

    click() {
        this.obj.name = "a2 click";
        console.log(this.inner.obj);
        //this.cdr.detectChanges(); //после отключения детектов сделать кастомный триггер изменений
    }
}
