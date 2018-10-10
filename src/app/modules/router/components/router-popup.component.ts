import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/index";

@Component({
    selector: 'm-router-popup',
    template: `
        MRouterPopupComponent 
        <p>Content</p>
        {{(resolvedContentFromRouter$ | async)?.content}}
    `
})

export class MRouterPopupComponent implements OnInit {

    resolvedContentFromRouter$: Observable<any> = this.route.data;

    constructor(private renderer: Renderer2, private elementRef: ElementRef, private route: ActivatedRoute) {
    }

    ngOnInit() {
        console.log("MRouterPopupComponent init");
        // эту дату прокинул из роутера в резолв
        // this.route.data.subscribe((data) => {
        //     console.log("router popup data ", data);
        // })
    }

    ngAfterViewInit() {
        let element = this.elementRef.nativeElement;
        this.renderer.setStyle(element, "display", "block");
        this.renderer.setStyle(element, "margin", "30px");
    }
}
