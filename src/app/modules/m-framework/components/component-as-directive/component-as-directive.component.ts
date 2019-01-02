import {Component, HostBinding, HostListener, OnInit} from '@angular/core';

@Component({
    selector: 'm-component-as-directive, [mComponentAsDirective]',
    templateUrl: './component-as-directive.component.html',
    styleUrls: ['./component-as-directive.component.less']
})
export class MComponentAsDirectiveComponent implements OnInit {
    @HostListener("click", ['$event'])
    public onClick(event) {
        console.log("HostListener event event ", event);
    }

    constructor() {
    }

    ngOnInit() {
    }

}
