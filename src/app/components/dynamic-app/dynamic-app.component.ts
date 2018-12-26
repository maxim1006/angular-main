import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'm-dynamic-app',
    templateUrl: './dynamic-app.component.html',
    styleUrls: ['./dynamic-app.component.less']
})
export class MDynamicAppComponent implements OnInit {
    @Input()
    public text: string;

    constructor() {
    }

    ngOnInit() {
    }

}
