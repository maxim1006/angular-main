import {
    AfterViewInit,
    Directive,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    NgZone,
    Output,
    PLATFORM_ID,
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

export interface SlideToggleEvent {
    element: HTMLElement;
    timePassedPercentage?: number;
    elementHeight: number;
    slideToggle: boolean;
}

@Directive({
    selector: "[slideToggle]",
})
export class SlideToggleDirective implements AfterViewInit {
    public element: HTMLElement;

    private _toggled = true;
    private _toggleStateOnAnimationStart = true;
    private _isAnimating = false;
    private _requestAnimationFrameId: number;
    private _direction = "up";
    private _height: number;
    private _currentStyleHeight: number;
    private _initOverflowStyle: string | any;

    @Input()
    public duration = 200;

    @Input()
    public set slideToggle(value: boolean) {
        this._toggled = value;

        if (!this._isAnimating && this.element) {
            this._runAnimation();
        }
    }

    public get slideToggle(): boolean {
        return this._toggled;
    }

    @Output() public onSlideStart = new EventEmitter<SlideToggleEvent>();
    @Output() public onSlideEnd = new EventEmitter<SlideToggleEvent>();
    @Output() public onSlideTick = new EventEmitter<SlideToggleEvent>();

    constructor(
        private _elementRef: ElementRef,
        @Inject(PLATFORM_ID) private platformId: Record<string, any>,
        private _zone: NgZone
    ) {}

    ngAfterViewInit(): void {
        this.element = this._elementRef.nativeElement;

        const initStyles = getComputedStyle(this.element);
        this._initOverflowStyle = initStyles.overflow;

        if (!this._toggled) {
            this.element.style.height = "0px";
            this.element.style.overflow = "hidden";
            this._setElHeight();
        }
    }

    private _runAnimation() {
        this._toggleStateOnAnimationStart = this._toggled;
        this._isAnimating = true;
        this._direction = this._toggled ? "down" : "up";
        this._setElHeight();

        this.onSlideStart.emit({
            element: this.element,
            elementHeight: this.element.offsetHeight,
            slideToggle: this._toggled,
        });

        this._zone.runOutsideAngular(() => {
            this.element.style.overflow = "hidden";
            this._animate();
        });
    }

    private _animate(): void {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this,
            start = performance.now();

        self._requestAnimationFrameId = requestAnimationFrame(function animate(
            time
        ) {
            let timePassed = time - start;

            if (timePassed > self.duration) {
                timePassed = self.duration;
            }

            self._tick(timePassed);

            if (
                (timePassed < self.duration &&
                    self._direction === "up" &&
                    self._currentStyleHeight > 0) ||
                (self._direction === "down" &&
                    self._currentStyleHeight < self._height)
            ) {
                self._requestAnimationFrameId = requestAnimationFrame(animate);
            }
        });
    }

    private _onAnimationEnd(): void {
        if (isPlatformBrowser(this.platformId)) {
            window.cancelAnimationFrame(this._requestAnimationFrameId);
        }

        if (this._toggleStateOnAnimationStart !== this._toggled) {
            requestAnimationFrame(this._runAnimation.bind(this));
        } else {
            if (this._toggled) {
                this.element.style.overflow = this._initOverflowStyle;
            }

            this._isAnimating = false;
        }

        this.onSlideEnd.emit({
            element: this.element,
            elementHeight: this.element.offsetHeight,
            slideToggle: this._toggled,
        });
    }

    private _tick(timePassed: number): void {
        const timePassedPercentage: number = Math.ceil(
                (Math.abs(timePassed) / this.duration) * 100
            ),
            currentTimePassedPercentage =
                this._direction === "up"
                    ? 100 - timePassedPercentage
                    : timePassedPercentage,
            elementHeight = (this._height * currentTimePassedPercentage) / 100;

        this._currentStyleHeight = elementHeight;
        this.element.style.height = this._currentStyleHeight + "px";

        this.onSlideTick.emit({
            element: this.element,
            elementHeight,
            timePassedPercentage,
            slideToggle: this._toggled,
        });

        if (timePassedPercentage === 100) {
            this._onAnimationEnd();
        }
    }

    private _setElHeight() {
        const elementInitComputedStyle = getComputedStyle(this.element),
            initVisibilityParametersMap = {},
            visibilityParametersMap = {
                height: "auto",
                opacity: 0,
                visibility: "hidden",
            };

        for (const key in visibilityParametersMap) {
            initVisibilityParametersMap[key] = elementInitComputedStyle[key];
            this.element.style[key] = visibilityParametersMap[key];
        }

        this._height = this.element.offsetHeight;

        for (const key in initVisibilityParametersMap) {
            this.element.style[key] = initVisibilityParametersMap[key];
        }
    }
}
