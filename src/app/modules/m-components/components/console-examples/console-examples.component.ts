import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'm-console-examples',
    templateUrl: './console-examples.component.html',
    styleUrls: ['./console-examples.component.less']
})
export class ConsoleExamplesComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
        console.clear();
        console.trace('console.trace');
        console.time('console.time');
        console.timeEnd('console.time');
        console.profile('counter');
        console.profileEnd('counter');
        console.log(console.memory);
        console.log(performance.now()); // ms
    }
}
