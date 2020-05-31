import {
    AfterViewInit,
    Directive,
    ElementRef,
    EventEmitter,
    OnDestroy,
    Output,
} from "@angular/core";
import { debounce } from "../../../../common/helpers/common.helper";
import ResizeObserver from "resize-observer-polyfill";

// const resizeObserverIsSupported = 'ResizeObserver' in window;

// TODO support older browsers if needed
@Directive({
    selector: "[mResizeObserver]",
})
export class ResizeObserverDirective implements AfterViewInit, OnDestroy {
    @Output() public resize: EventEmitter<any> = new EventEmitter();
    @Output() public resizeEnd: EventEmitter<any> = new EventEmitter();

    private _resizeObserver?: any;
    private debouncedResizeEnd?: any;

    ngAfterViewInit() {
        this._resizeObserver = new ResizeObserver(entries => {
            this.checkForResize(entries);
        });

        this._resizeObserver.observe(this._element.nativeElement);
    }

    constructor(private _element: ElementRef) {
        this.debouncedResizeEnd = debounce(
            entry => this.resizeEnd.emit(entry),
            500
        );
    }

    ngOnDestroy() {
        this._resizeObserver.unobserve(<Element>this._element.nativeElement);
        this._resizeObserver.disconnect();
    }

    private checkForResize = (entries: Array<ResizeObserverEntry>) => {
        entries.forEach((entry: ResizeObserverEntry) => {
            if (this.checkIfIntersecting(entry)) {
                this.resize.emit(entry);
                this.debouncedResizeEnd(entry);
            }
        });
    };

    private checkIfIntersecting(entry: ResizeObserverEntry) {
        return entry.target === this._element.nativeElement;
    }
}
