import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'm-lazy-dynamic',
    templateUrl: './lazy-dynamic.component.html',
    styleUrls: ['./lazy-dynamic.component.less']
})
export class MLazyDynamicComponent implements OnInit {

    @Input()
    public text: string;

    constructor() {
    }

    ngOnInit() {
    }

}
