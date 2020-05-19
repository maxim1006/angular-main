import {Component, ElementRef, Input, NgZone, OnInit, ViewChild, ChangeDetectorRef, PLATFORM_ID, Inject} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Component({
    selector: 'm-scroll',
    templateUrl: './m-scroll.component.html'
})

export class MScrollComponent implements OnInit {

    @Input() public styleClass: String;
    @Input() public customStyle: Object;
    @Input() public scrollBlockStyle: Object;
    @Input() public minSliderSize: number;
    @Input() public minSliderWidthSize: number;

    @ViewChild('mScrollInner') mScrollInner: ElementRef;
    @ViewChild('mScroll') mScroll: ElementRef;
    @ViewChild('mScrollSlider') mScrollSlider: ElementRef;
    @ViewChild('mScrollSliderWrap') mScrollSliderWrap: ElementRef;
    @ViewChild('mScrollSliderHorizontal') mScrollSliderHorizontal: ElementRef;
    @ViewChild('mScrollSliderWrapHorizontal') mScrollSliderWrapHorizontal: ElementRef;

    private obj: HTMLElement;
    private scroll: HTMLElement;
    private ySlider: HTMLElement;
    private ySliderWrap: HTMLElement;
    private ySliderHorizontal: HTMLElement;
    private ySliderHorizontalWrap: HTMLElement;

    private doc: Document = document;
    private win: Window = window;
    private objHeight = 0;
    private yBarHeight = 0;
    private yBarWidth = 0;
    private scrollHeight = 0;
    private scrollWidth = 0;
    private ySliderHeight = 0;
    private ySliderHorizontalWidth = 0;
    private ySliderHeightFull = 0;
    private ySliderHorizontalWidthFull = 0;
    private yEdgeBtm = 0;
    private yEdgeRight = 0;
    private delta = 0;
    private deltaHorizontal = 0;
    private startPoint = 0;
    private startPointX = 0;
    private canDrag = true;
    private canDragX = true;
    private startPosition = 0;
    private startPositionX = 0;
    private direction: string;
    private SCROLL_RATIO = 0;
    private SCROLL_RATIO_X = 0;
    private scrollScrollTop = 0;
    private scrollScrollLeft = 0;
    private scrollbarWidth = 0;
    public ySliderWrapVisible = false;
    public ySliderHorizontalWrapVisible = false;
    private windowResizeTimeoutID: number;
    private autoResizeFlag: boolean;
    private timeoutID: number;
    public mobile: boolean;
    private scrollStartBind:     () => void;
    private mouseWheelBind:      () => void;
    private scrollStartXBind:    () => void;
    private mouseMoveBind:       () => void;
    private mouseUpBind:         () => void;
    private windowResizeBind:    () => void;
    private mouseScrollBind:     () => void;
    private clickBind:           () => void;
    private clickHorizontalBind: () => void;
    private autoResizeBind:      () => void;
    private autoResizeEndBind:   () => void;

    constructor(
        private zone: NgZone,
        private cdr: ChangeDetectorRef,
        @Inject(PLATFORM_ID) private platformId: Object,
    ) {
    }

    ngOnInit() {
        this.mobile = this.isMobile();
    }

    ngAfterViewInit() {
        this.obj = this.mScroll.nativeElement;
        this.scroll = this.mScrollInner.nativeElement;
        this.ySlider = this.mScrollSlider.nativeElement;
        this.ySliderWrap = this.mScrollSliderWrap.nativeElement;
        this.ySliderHorizontal = this.mScrollSliderHorizontal.nativeElement;
        this.ySliderHorizontalWrap = this.mScrollSliderWrapHorizontal.nativeElement;

        this.objHeight = this.obj.offsetHeight;

        this.scrollbarWidth = this.getScrollbarWidth();

        this.hideNativeScrolls();
        this.updateVars();
        this.bindEvents();

        this.cdr.detectChanges();
    }

    private getScrollbarWidth() {
        let scrollDiv, scrollbarWidth;

        scrollDiv = document.createElement('div');
        scrollDiv.className = 'm-scroll-measure';
        document.body.appendChild(scrollDiv);
        scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);

        return scrollbarWidth;
    }

    private hideNativeScrolls() {
        this.scrollbarWidth = this.getScrollbarWidth();
        this.scroll.style.marginBottom = this.scroll.style.marginBottom ? -this.scrollbarWidth + 'px' : '';

        this.scroll.style.height = `calc(100% + ${this.scrollbarWidth + 1}px)`; //because of fractional numbers in screen
        this.scroll.style.width = `calc(100% + ${this.scrollbarWidth + 1}px)`;  //because of fractional numbers in screen
    }

    private updateVars() {
        this.objHeight = this.yBarHeight = this.obj.offsetHeight;
        this.scrollHeight = this.scroll.scrollHeight;
        this.ySliderHeightFull = this.minSliderSize ? this.minSliderSize : this.yBarHeight * this.yBarHeight / this.scrollHeight;
        this.ySlider.style.height = this.ySliderHeightFull + 'px';
        this.ySliderHeight = this.ySliderHeightFull / 2;
        this.yEdgeBtm = this.yBarHeight - this.ySliderHeightFull;

        this.countDelta();

        this.startPoint = 0;
        this.startPosition = 0;
        this.canDrag = false;
        this.canDragX = false;
        this.SCROLL_RATIO = (this.yBarHeight - this.ySliderHeightFull) / (Math.ceil(this.scrollHeight / this.yBarHeight * 2));
        this.scrollScrollTop = this.scroll.scrollTop;

        if (this.scrollScrollTop) {
            this.ySlider.style.top = this.scrollScrollTop / this.delta + 'px';
        } else {
            this.ySlider.style.top = 0 + 'px';
        }

        this.scrollWidth = this.scroll.scrollWidth;
        this.yBarWidth = this.obj.offsetWidth;
        this.ySliderHorizontalWidthFull = this.minSliderWidthSize ? this.minSliderWidthSize : this.yBarWidth * this.yBarWidth / this.scrollWidth;
        this.ySliderHorizontal.style.width = this.ySliderHorizontalWidthFull + 'px';
        this.ySliderHorizontalWidth = this.ySliderHorizontalWidthFull / 2;
        this.yEdgeRight = this.yBarWidth - this.ySliderHorizontalWidthFull;

        this.countDeltaHorizontal();

        this.startPointX = 0;
        this.startPositionX = 0;
        this.scrollScrollLeft = this.scroll.scrollLeft;
        this.SCROLL_RATIO_X = (this.yBarWidth - this.ySliderHorizontalWidthFull) / (Math.ceil(this.scrollHeight / this.yBarHeight * 2));

        if (this.scrollScrollLeft) {
            this.ySliderHorizontal.style.left = this.scrollScrollLeft / this.deltaHorizontal + 'px';
        } else {
            this.ySliderHorizontal.style.left = 0 + 'px';
        }
    }

    private isHighResolutionScreen(): boolean {
        const windowMatchMedia = window.matchMedia('(min-resolution: 2dppx)');
        return windowMatchMedia && windowMatchMedia.matches;
    }

    private getHighResolutionOffset(): number {
        return this.isHighResolutionScreen() ? 2 : 1; //because of fractional numbers in high resolution screens
    }

    private countDelta() {
        this.delta = (this.scrollHeight - this.yBarHeight) / (this.yBarHeight - this.ySliderHeightFull);
        this.ySliderWrapVisible = (this.scrollHeight - this.yBarHeight) > this.getHighResolutionOffset();
    }

    private countDeltaHorizontal() {
        this.deltaHorizontal = (this.scrollWidth - this.yBarWidth) / (this.yBarWidth - this.ySliderHorizontalWidthFull);
        this.ySliderHorizontalWrapVisible = (this.scrollWidth - this.yBarWidth) > this.getHighResolutionOffset();

        if (this.objHeight === this.scroll.offsetHeight) {
            this.scroll.style.marginBottom = -this.scrollbarWidth + 'px'; //because of fractional numbers in high resolution screens
        }
    }

    private bindEvents() {
        if (isPlatformBrowser(this.platformId)) {
            this.zone.runOutsideAngular(() => {
                this.scrollStartBind = this.scrollStart.bind(this);
                this.mouseWheelBind = this.mouseWheel.bind(this);
                this.scrollStartXBind = this.scrollStartX.bind(this);
                this.mouseMoveBind = this.mouseMove.bind(this);
                this.mouseUpBind = this.mouseUp.bind(this);
                this.windowResizeBind = this.windowResize.bind(this);
                this.mouseScrollBind = this.mouseScroll.bind(this);
                this.clickBind = this.click.bind(this);
                this.clickHorizontalBind = this.clickHorizontal.bind(this);
                this.autoResizeBind = this.autoResize.bind(this);
                this.autoResizeEndBind = this.autoResizeEnd.bind(this);

                this.ySlider.addEventListener('mousedown', this.scrollStartBind);
                this.ySlider.addEventListener('touchstart', this.scrollStartBind);

                this.ySliderWrap.addEventListener('DOMMouseScroll', this.mouseWheelBind);
                this.ySliderWrap.addEventListener('mousewheel', this.mouseWheelBind);
                this.ySliderWrap.addEventListener('MozMousePixelScroll', this.mouseWheelBind);

                this.ySliderHorizontal.addEventListener('mousedown', this.scrollStartXBind);
                this.ySliderHorizontal.addEventListener('touchstart', this.scrollStartXBind);

                this.ySliderHorizontalWrap.addEventListener('DOMMouseScroll', this.mouseWheelBind);
                this.ySliderHorizontalWrap.addEventListener('mousewheel', this.mouseWheelBind);
                this.ySliderHorizontalWrap.addEventListener('MozMousePixelScroll', this.mouseWheelBind);

                this.doc.addEventListener('mousemove', this.mouseMoveBind);
                this.doc.addEventListener('touchmove', this.mouseMoveBind);

                this.doc.addEventListener('mouseup', this.mouseUpBind);
                this.doc.addEventListener('touchend', this.mouseUpBind);

                this.win.addEventListener('resize', this.windowResizeBind);

                this.scroll.addEventListener('scroll', this.mouseScrollBind);

                this.ySliderWrap.addEventListener('mousedown', this.clickBind);
                this.ySliderWrap.addEventListener('touchstart', this.clickBind);

                this.ySliderHorizontalWrap.addEventListener('mousedown', this.clickHorizontalBind);
                this.ySliderHorizontalWrap.addEventListener('touchstart', this.clickHorizontalBind);

                this.obj.addEventListener('mouseenter', this.autoResizeBind);
                this.obj.addEventListener('touchstart', this.autoResizeBind);
                this.obj.addEventListener('mouseleave', this.autoResizeEndBind);
                this.obj.addEventListener('touchend', this.autoResizeEndBind);
            });
        }
    }

    ngOnDestroy() {
        this.ySlider.removeEventListener('mousedown', this.scrollStartBind);
        this.ySlider.removeEventListener('touchstart', this.scrollStartBind);

        this.ySliderWrap.removeEventListener('DOMMouseScroll', this.mouseWheelBind);
        this.ySliderWrap.removeEventListener('mousewheel', this.mouseWheelBind);
        this.ySliderWrap.removeEventListener('MozMousePixelScroll', this.mouseWheelBind);

        this.ySliderHorizontal.removeEventListener('mousedown', this.scrollStartXBind);
        this.ySliderHorizontal.removeEventListener('touchstart', this.scrollStartXBind);

        this.ySliderHorizontalWrap.removeEventListener('DOMMouseScroll', this.mouseWheelBind);
        this.ySliderHorizontalWrap.removeEventListener('mousewheel', this.mouseWheelBind);
        this.ySliderHorizontalWrap.removeEventListener('MozMousePixelScroll', this.mouseWheelBind);

        this.doc.removeEventListener('mousemove', this.mouseMoveBind);
        this.doc.removeEventListener('touchmove', this.mouseMoveBind);

        this.doc.removeEventListener('mouseup', this.mouseUpBind);
        this.doc.removeEventListener('touchend', this.mouseUpBind);

        this.win.removeEventListener('resize', this.windowResizeBind);

        this.scroll.removeEventListener('scroll', this.mouseScrollBind);

        this.ySliderWrap.removeEventListener('mousedown', this.clickBind);
        this.ySliderWrap.removeEventListener('touchstart', this.clickBind);

        this.ySliderHorizontalWrap.removeEventListener('mousedown', this.clickHorizontalBind);
        this.ySliderHorizontalWrap.removeEventListener('touchstart', this.clickHorizontalBind);

        this.obj.removeEventListener('mouseenter', this.autoResizeBind);
        this.obj.removeEventListener('touchstart', this.autoResizeBind);
        this.obj.removeEventListener('mouseleave', this.autoResizeEndBind);
        this.obj.removeEventListener('touchend', this.autoResizeEndBind);
    }

    private windowResize() {
        clearTimeout(this.windowResizeTimeoutID);
        this.windowResizeTimeoutID = window.setTimeout(() => {
            this.hideNativeScrolls();
        }, 500);
    }

    private scrollStart(e: MouseEvent) {
        e.stopPropagation();
        this.canDrag = true;
        this.startPoint = e.pageY;
        this.startPosition =  this.ySlider.offsetTop;

        this.turnOffSelection(this.scroll);
    }

    private scrollStartX(e: MouseEvent) {
        e.stopPropagation();

        this.canDragX = true;
        this.startPointX = e.pageX;
        this.startPositionX = this.ySliderHorizontal.offsetLeft;

        this.turnOffSelection(this.scroll);
    }

    private click(e: MouseEvent) {
        if (this.canDrag) { return; }

        const pageY = e.pageY,
            offsetTop = e.currentTarget['getBoundingClientRect']().top,
            diff = pageY - offsetTop - this.ySliderHeight;

        this.scroll.scrollTop = diff * this.delta;
    }

    private clickHorizontal(e: MouseEvent) {
        if (this.canDragX) { return; }

        const pageX = e.pageX,
            offsetLeft = e.currentTarget['getBoundingClientRect']().lelft,
            diff = pageX - offsetLeft - this.ySliderHorizontalWidth;

        this.scroll.scrollLeft = diff * this.deltaHorizontal;
    }

    private isMobile() {
        return (/android|webos|iphone|ipad|ipod|blackberry|Windows Phone/i.test(navigator.userAgent));
    }

    private mouseWheel(e: any = {}) {
        if (!e.originalEvent) {
            return;
        }

        let sliderResult,
            curY = this.ySlider.offsetTop;

        if (e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0) {
            this.direction = 'down';
        } else {
            this.direction = 'up';
        }

        if (curY > this.yEdgeBtm - this.SCROLL_RATIO && this.direction === 'down') {
            sliderResult = this.yEdgeBtm;
        } else if (curY < 0) {
            sliderResult = 0;
        } else if (curY  < this.yEdgeBtm && this.direction === 'down') {
            sliderResult = curY + this.SCROLL_RATIO;
        } else if (this.direction === 'up' && curY > 0) {
            sliderResult = curY - this.SCROLL_RATIO;
        }

        this.ySlider.style.top = sliderResult + 'px';

        return false;
    }

    private mouseMove(e: MouseEvent) {

        if (!this.canDrag && !this.canDragX) { return; }

        if (this.canDrag) {

            let diff1 = e.pageY - this.startPoint,
                diff = diff1 + this.startPosition,
                sliderResult, blockResult;

            if (diff1 < 0 && Math.abs(diff1) >= this.startPosition) {
                sliderResult = 0;
                blockResult = 0;
            } else if (diff1 > 0 && diff1 >= this.yEdgeBtm - this.startPosition) {
                sliderResult = this.yEdgeBtm;
                blockResult = this.scrollHeight;
            } else {
                sliderResult = diff;
                blockResult = diff * this.delta;
            }

            this.ySlider.style.top = sliderResult + 'px';
            this.scroll.scrollTop = blockResult;

        } else if (this.canDragX) {

            let diffX1 = e.pageX - this.startPointX,
                diffX = diffX1 + this.startPositionX,
                sliderResultX, blockResultX;

            if (diffX1 < 0 && Math.abs(diffX1) >= this.startPositionX) {
                sliderResultX = 0;
                blockResultX = 0;
            } else if (diffX1 > 0 && diffX1 >= this.yEdgeRight - this.startPositionX) {
                sliderResultX = this.yEdgeRight;
                blockResultX = this.scrollWidth;
            } else {
                sliderResultX = diffX;
                blockResultX = diffX * this.deltaHorizontal;
            }

            this.ySliderHorizontal.style.left = sliderResultX + 'px';
            this.scroll.scrollLeft = blockResultX;

        }

        e.preventDefault();
    }

    private mouseUp() {
        this.canDrag = false;
        this.canDragX = false;

        this.turnOnSelection(this.scroll);
    }

    private mouseScroll(e: Event) {
        if (this.canDrag) { return; }

        this.ySlider.style.top = this.scroll.scrollTop / this.delta + 'px';
        this.ySliderHorizontal.style.left = this.scroll.scrollLeft / this.deltaHorizontal + 'px';
    }

    private turnOffSelection(el: HTMLElement) {
        el.setAttribute('unselectable', 'on');
        el.classList.add('_unselectable');
    }

    private turnOnSelection(el: HTMLElement) {
        el.removeAttribute('unselectable');
        el.classList.remove('_unselectable');
    }

    private autoResize() {
        let self = this,
            tempScrollHeight, tempObjHeight, tempScrollWidth, tempObjWidth;

        this.autoResizeFlag = true;
        this.timeoutID = window.setTimeout(function resize() {

            self.zone.run(() => {
                tempScrollHeight = self.scroll.scrollHeight;
                tempScrollWidth = self.scroll.scrollWidth;
                tempObjHeight = self.obj.offsetHeight;
                tempObjWidth = self.obj.offsetWidth;

                if (self.obj && ((tempScrollHeight !== self.scrollHeight || tempObjHeight !== self.objHeight) ||
                    (tempScrollWidth !== self.scrollWidth || tempObjWidth !== self.yBarWidth))) {

                    self.updateVars();
                    self.objHeight = tempObjHeight;
                    self.yBarWidth = tempObjWidth;
                }

                if (self.autoResizeFlag) { window.setTimeout(resize, 1000); }
            });

        }, 300);
    }

    private autoResizeEnd() {
        this.autoResizeFlag = false;
        clearInterval(this.timeoutID);
    }
}
