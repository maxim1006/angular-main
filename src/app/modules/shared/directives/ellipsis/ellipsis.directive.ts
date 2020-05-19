import {
    Directive, ElementRef, Input, OnInit, HostBinding, NgZone, ChangeDetectorRef, PLATFORM_ID, Inject
} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Directive({
    selector: '[ellipsis]'
})

export class EllipsisDirective implements OnInit {
    cb: (e: Event) => void;

    @Input() ellipsis: number;

    @HostBinding('attr.title') public titleAttr = '';

    @HostBinding('class._ellipsis')
    public ellipsisStyleClass = true;

    private fakeDiv: HTMLDivElement;
    private initialText: string;
    private el: any;
    private viewInited: boolean;
    private TIMEOUT_ID: number;
    private resizeStartFlag = true;

    constructor(@Inject(PLATFORM_ID) private platformId: Object, private elRef: ElementRef, private zone: NgZone, private cdr: ChangeDetectorRef) {}

    ngOnChanges(value: any) {
        if (value.ellipsis && value.ellipsis.currentValue && this.viewInited) {
            this.setEllipsis();
        }
    }

    ngOnInit() {}

    ngAfterViewInit() {

        this.el = this.elRef.nativeElement;
        this.initialText = this.el.textContent;

        if (isPlatformBrowser(this.platformId)) {
            if (this.ellipsis) {
                this.createFakeDiv();
                document.body.appendChild(this.fakeDiv);
                this.updateEllipsis();
            }
        }

        this.viewInited = true;

        if (isPlatformBrowser(this.platformId)) {
            this.cb = (e: Event) => {
                if (this.resizeStartFlag) {
                    this.zone.run(() => {
                        this.el.style.maxHeight = this.ellipsis + 'px';
                        this.el.style.overflow = 'hidden';
                        this.resizeStartFlag = false;
                    });
                }

                clearTimeout(this.TIMEOUT_ID);
                this.TIMEOUT_ID = window.setTimeout(() => {
                    this.zone.run(() => {
                        this.el.style.maxHeight = 'auto';
                        this.el.style.overflow = 'visible';
                        this.updateEllipsis();
                        this.resizeStartFlag = true;
                    });
                }, 300);
            };

            this.zone.runOutsideAngular(() => {
                window.addEventListener('resize', this.cb);
            });
        }

        this.cdr.detectChanges();
    }

    ngOnDestroy() {
        if (isPlatformBrowser(this.platformId)) {
            document.body.removeChild(this.fakeDiv);
            window.removeEventListener('resize', this.cb);
        }

        this.fakeDiv = null;
    }

    isEllipsisActive(e: HTMLElement): boolean {
        return (e.offsetWidth < e.scrollWidth - 1);
    }

    updateEllipsis() {
        this.setupFakeDiv();
        this.setEllipsis();
    }

    setEllipsis(): void {
        if (this.getDotFlag()) {
            this.el.textContent = this.addDots(this.fitText(this.initialText));
            this.titleAttr = this.initialText;
        } else {
            this.el.textContent = this.fitText(this.initialText);
            if (this.initialText && this.initialText.slice(-3) !== '...') {
                this.titleAttr = '';
            }
        }
    }

    createFakeDiv(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.fakeDiv = document.createElement('div');
            this.fakeDiv.style.position = 'absolute';
            this.fakeDiv.style.left = '-99999px';
        }
    }

    fitText(text: string): string {
        let fittedTextBeforeLastWord = '';

        while (this.fakeDiv.offsetHeight > this.ellipsis) {
            fittedTextBeforeLastWord = text;
            text = this.removeWord(text);
            this.fakeDiv.textContent = text;
        }

        if (fittedTextBeforeLastWord) {
            this.fakeDiv.textContent = fittedTextBeforeLastWord;

            while (this.fakeDiv.offsetHeight > this.ellipsis) {
                text = this.removeSymbol(fittedTextBeforeLastWord);
                fittedTextBeforeLastWord = text;
                this.fakeDiv.textContent = text;
            }
        }

        return text;
    }

    removeWord(text: string): string {
        const arr = text.split(' ');
        arr.pop();
        return arr.join(' ');
    }

    removeSymbol(text: string): string {
        return text.slice(0, text.length - 1);
    }

    addDots(text: string): string {
        return text.slice(0, -3) + '...';
    }

    getDotFlag() {
        return this.fakeDiv.offsetHeight > this.ellipsis;
    }

    setupFakeDiv() {
        const computedStyle = getComputedStyle(this.el);
        this.fakeDiv.style.width = computedStyle.width;
        this.fakeDiv.style.paddingLeft = computedStyle.paddingLeft;
        this.fakeDiv.style.paddingRight = computedStyle.paddingRight;
        this.fakeDiv.style.fontSize = computedStyle.fontSize;
        this.fakeDiv.style.fontWeight = computedStyle.fontWeight;
        this.fakeDiv.style.letterSpacing = computedStyle.letterSpacing;
        this.fakeDiv.style.fontFamily = computedStyle.fontFamily;
        this.fakeDiv.style.lineHeight = computedStyle.lineHeight;
        this.fakeDiv.style.wordWrap = 'break-word';
        this.fakeDiv.textContent = this.initialText;
    }
}
