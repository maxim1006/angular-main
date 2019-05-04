import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'm-lazy-runtime',
    template: `lazy runtime works`
})

export class LazyRuntimeComponent implements OnInit {
    constructor() {
        // https://juristr.com/blog/2019/04/state-lazy-loading-components-angular/
        // and lazy-af module for runtime module add.
    }

    ngOnInit() {
    }
}
