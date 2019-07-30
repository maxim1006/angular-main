import {Directive, ElementRef, EventEmitter, HostBinding, Output} from '@angular/core';

// TODO support older browsers if needed
@Directive({
    selector: '[mDeferLoad]'
})
export class DeferLoadDirective {
    @HostBinding('class.mDeferLoad__invisible') mDeferLoadInvisible = true;
    @HostBinding('class.mDeferLoad__visible') mDeferLoadVisible = false;

    @Output() public deferLoad: EventEmitter<any> = new EventEmitter();

    private _intersectionObserver?: IntersectionObserver;

    public ngAfterViewInit () {
        this._intersectionObserver = new IntersectionObserver(entries => {
            this.checkForIntersection(entries);
        }, {
            // опции для настройки пересечения, в случае если нужно относительно элемента с прокруткой, то
            // проставляю root: document.querySelector(...)
            // root: document.querySelector('#scrollArea'),
            // rootMargin: '0px',
            // threshold: 0
        });
        this._intersectionObserver.observe((this._element.nativeElement));

        // фоллбек
        // if (this._element.nativeElement.getBoundingClientRect().top <= window.innerHeight) {
        //     console.log('visible');
        // }
    }

    constructor (
        private _element: ElementRef
    ) {}

    private checkForIntersection = (entries: Array<IntersectionObserverEntry>) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
            if (this.checkIfIntersecting(entry)) {
                this.deferLoad.emit();
                this._intersectionObserver.unobserve(<Element>(this._element.nativeElement));
                this._intersectionObserver.disconnect();
                this.mDeferLoadVisible = true;
            }
        });
    }

    private checkIfIntersecting (entry: IntersectionObserverEntry) {
        return (<any>entry).isIntersecting && entry.target === this._element.nativeElement;
    }
}
