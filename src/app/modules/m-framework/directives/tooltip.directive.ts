import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
    selector: '[tooltip]',
    exportAs: 'tooltip'
})
export class TooltipDirective {
    @Input()
    public tooltip: string;

    private tooltipElement: HTMLElement;

    constructor(private element: ElementRef) {
        this.tooltipElement = document.createElement("div");
    }

    ngOnInit() {
        this.element.nativeElement.append(this.tooltipElement);
        this.tooltipElement.textContent = this.tooltip;
    }

    show() {
        this.tooltipElement.style.display = "block";
    }

    hide() {
        this.tooltipElement.style.display = "none";
    }
}
