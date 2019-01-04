import {AfterViewInit, Directive, ElementRef, EventEmitter, Input, NgZone, Output} from '@angular/core';


export interface SlideToggleEvent {
    element: HTMLElement;
    timePassedPercentage?: number;
    elementHeight: number;
    slideToggle: boolean;
}


@Directive({
    selector: '[slideToggle]'
})
export class SlideToggleDirective implements AfterViewInit {
    public element: HTMLElement;

    private _toggled = true;
    private _toggleStateOnAnimationStart = true;
    private _isAnimating = false;
    private _requestAnimationFrameId: number;
    private _direction = 'up';
    private _height: number;
    private _currentStyleHeight: number;
    private _initOverflowStyle: string | any;

    @Input()
    public duration = 200;

    @Input()
    public set slideToggle(value: boolean) {
        const self = this;

        self._toggled = value;

        if (!self._isAnimating && self.element) {
            self._runAnimation();
        }
    }

    public get slideToggle(): boolean {
        return this._toggled;
    }

    @Output() public onSlideStart = new EventEmitter<SlideToggleEvent>();
    @Output() public onSlideEnd = new EventEmitter<SlideToggleEvent>();
    @Output() public onSlideTick = new EventEmitter<SlideToggleEvent>();

    constructor(private _elementRef: ElementRef,
                private _zone: NgZone) {
    }

    ngAfterViewInit(): void {
        const self = this;

        self.element = self._elementRef.nativeElement;

        const initStyles = getComputedStyle(self.element);
        self._initOverflowStyle = initStyles.overflow;

        if (!self._toggled) {
           self.element.style.height = '0px';
           self.element.style.overflow = 'hidden';
           self._setElHeight();
        }
    }

    private _runAnimation() {
        const self = this;

        self._toggleStateOnAnimationStart = self._toggled;
        self._isAnimating = true;
        self._direction = self._toggled ? 'down' : 'up';
        self._setElHeight();

        self.onSlideStart.emit({
            element: self.element,
            elementHeight: self.element.offsetHeight,
            slideToggle: self._toggled
        });

        self._zone.runOutsideAngular(() => {
            self.element.style.overflow = 'hidden';
            self._animate();
        });
    }

    private _animate(): void {
        const self = this,
            start = performance.now();

        self._requestAnimationFrameId = requestAnimationFrame(function animate(time) {

            let timePassed = time - start;

            if (timePassed > self.duration) {
                timePassed = self.duration;
            }

            self._tick(timePassed);

            if (timePassed < self.duration &&
                self._direction === 'up' && self._currentStyleHeight > 0 ||
                self._direction === 'down' && self._currentStyleHeight < self._height
            ) {
                self._requestAnimationFrameId = requestAnimationFrame(animate);
            }
        });
    }

    private _onAnimationEnd(): void {
        const self = this;
        window.cancelAnimationFrame(self._requestAnimationFrameId);

        if (self._toggleStateOnAnimationStart !== self._toggled) {
            requestAnimationFrame(self._runAnimation.bind(self));
        } else {
            if (self._toggled) {
                self.element.style.overflow = self._initOverflowStyle;
            }

            self._isAnimating = false;
        }

        self.onSlideEnd.emit({
            element: self.element,
            elementHeight: self.element.offsetHeight,
            slideToggle: self._toggled
        });
    }

    private _tick(timePassed: number): void {
        const self = this,
            timePassedPercentage: number = Math.ceil(Math.abs(timePassed) / self.duration * 100),
            currentTimePassedPercentage = self._direction === 'up' ? 100 - timePassedPercentage : timePassedPercentage,
            elementHeight = self._height * currentTimePassedPercentage / 100;

        self._currentStyleHeight = elementHeight;
        self.element.style.height = self._currentStyleHeight + 'px';

        self.onSlideTick.emit({
            element: self.element,
            elementHeight,
            timePassedPercentage,
            slideToggle: self._toggled
        });

        if (timePassedPercentage === 100) {
            self._onAnimationEnd();
        }
    }

    private _setElHeight() {
        const self = this,
            elementInitComputedStyle = getComputedStyle(self.element),
            initVisibilityParametersMap = {},
            visibilityParametersMap = {
                height: 'auto',
                opacity: 0,
                visibility: 'hidden'
            };

        for (const key in visibilityParametersMap) {
            initVisibilityParametersMap[key] = elementInitComputedStyle[key];
            self.element.style[key] = visibilityParametersMap[key];
        }

        self._height = self.element.offsetHeight;

        for (const key in initVisibilityParametersMap) {
            self.element.style[key] = initVisibilityParametersMap[key];
        }
    }

}
