import { ElementRef, OnInit, NgZone } from '@angular/core';
export declare class EllipsisDirective implements OnInit {
    private elRef;
    private zone;
    cb: (e: Event) => void;
    ellipsis: number;
    titleAttr: string;
    ellipsisStyleClass: boolean;
    private fakeDiv;
    private initialText;
    private el;
    private viewInited;
    private TIMEOUT_ID;
    private resizeStartFlag;
    constructor(elRef: ElementRef, zone: NgZone);
    ngOnChanges(value: any): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    isEllipsisActive(e: HTMLElement): boolean;
    updateEllipsis(): void;
    setEllipsis(): void;
    createFakeDiv(): void;
    fitText(text: string): string;
    removeWord(text: string): string;
    addDots(text: string): string;
    getDotFlag(): boolean;
    setupFakeDiv(): void;
}
