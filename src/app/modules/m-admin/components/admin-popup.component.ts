import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {Renderer3} from "@angular/core/src/render3/interfaces/renderer";

@Component({
    selector: 'm-admin-popup',
    template: `
        MAdminPopupComponent 123
    `
})

export class MAdminPopupComponent implements OnInit {

    constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        let element = this.elementRef.nativeElement;
        this.renderer.setStyle(element, "position", "absolute");
        this.renderer.setStyle(element, "top", "50%");
        this.renderer.setStyle(element, "left", "50%");
        this.renderer.setStyle(element, "transform", "translate(-50%, -50%)");
    }
}
