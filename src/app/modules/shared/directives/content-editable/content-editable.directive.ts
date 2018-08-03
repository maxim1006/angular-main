import {
    Directive, HostListener, ElementRef, Input, Output, EventEmitter, OnInit, HostBinding,
    ChangeDetectorRef
} from '@angular/core';

@Directive({
    selector: '[contentEditable]',
})

export class ContentEditableDirective implements OnInit {

    @Input() contentEditable: any;
    @Input() contentEditableRequired: boolean;
    @Input() contentEditableMaxHeight: number;
    @Input() fixed: boolean;
    @Output() contentEditableChange = new EventEmitter();

    @HostBinding('attr.title') public titleAttr = '';

    @HostBinding('class._content-editable')
    public contentEditableStyleClass:boolean;

    private fakeDiv: HTMLDivElement;
    private initialText: string;
    private el: any;
    private manuallyUpdatedView: boolean = true;
    private viewInited: boolean;

    @HostListener('blur', ['$event'])
    public onBlur():void {

        if (!this.elRef.nativeElement.textContent.trim().length && this.contentEditableRequired) {
            this.elRef.nativeElement.textContent = this.contentEditable;
            return;
        }

        if (this.el.textContent !== '...') {
            this.initialText = this.elRef.nativeElement.textContent;
        }

        this.manuallyUpdatedView = false;
        this.updateEllipsis();

        this.contentEditableChange.emit(this.initialText);
    }

    @HostListener('focus', ['$event'])
    public onFocus():void {

        this.el.textContent = this.initialText;
    }

    constructor(private elRef: ElementRef, private cdr: ChangeDetectorRef) {
    }

    ngOnChanges(value: any) {
        if (value.contentEditable && value.contentEditable.currentValue && this.viewInited) {
            this.elRef.nativeElement.textContent = this.contentEditable;
            this.onBlur();
        }
    }

    ngOnInit() {
        this.contentEditableStyleClass = true;
    }

    ngAfterViewInit() {
        if (this.contentEditable) {
            this.elRef.nativeElement.textContent = this.contentEditable;
            this.initialText = this.contentEditable;
        }

        this.el = this.elRef.nativeElement;

        if (this.contentEditableMaxHeight) {
            this.createFakeDiv();
            document.body.appendChild(this.fakeDiv);
            this.updateEllipsis();
        }

        this.viewInited = true;
    }

    ngOnDestroy() {
        document.body.removeChild(this.fakeDiv);
        this.fakeDiv = null;
    }

    isEllipsisActive(e:HTMLElement):boolean {
        return (e.offsetWidth < e.scrollWidth - 1);
    }

    updateEllipsis() {
        this.setupFakeDiv();
        this.setEllipsis();
    }

    setEllipsis():void {
        if (this.getDotFlag()) {
            this.el.textContent = this.addDots(this.fitText(this.initialText));
            this.titleAttr = this.initialText;
        } else {
            this.el.textContent = this.fitText(this.initialText);
            if (this.initialText && this.initialText.slice(-3) !== '...') {
                this.titleAttr = '';
            }
        }

        if (!this.manuallyUpdatedView) {
            this.manuallyUpdatedView = true;
            this.cdr.detectChanges();
        }

    }

    createFakeDiv():void {
        this.fakeDiv = document.createElement('div');
        this.fakeDiv.style.position = 'absolute';
        this.fakeDiv.style.left = '-99999px';
    }

    fitText(text: string):string {

        while(this.fakeDiv.offsetHeight > this.contentEditableMaxHeight) {
            text = this.removeWord(text);
            this.fakeDiv.textContent = text;
        }

        return text;
    }

    removeWord(text: string):string {
        let arr = text.split(" ");
        arr.pop();
        return arr.join(" ");
    }

    addDots(text: string): string {
        return text.slice(0, -3) + '...';
    }

    getDotFlag() {
        return this.fakeDiv.offsetHeight > this.contentEditableMaxHeight;
    }

    setupFakeDiv() {
        let computedStyle = getComputedStyle(this.el);
        this.fakeDiv.style.width = computedStyle.width;
        this.fakeDiv.style.paddingLeft = computedStyle.paddingLeft;
        this.fakeDiv.style.paddingRight = computedStyle.paddingRight;
        this.fakeDiv.style.fontSize = computedStyle.fontSize;
        this.fakeDiv.style.fontWeight = computedStyle.fontWeight;
        this.fakeDiv.style.letterSpacing = computedStyle.letterSpacing;
        this.fakeDiv.style.fontFamily = computedStyle.fontFamily;
        this.fakeDiv.style.lineHeight = computedStyle.lineHeight;
        this.fakeDiv.textContent = this.initialText;
    }
}