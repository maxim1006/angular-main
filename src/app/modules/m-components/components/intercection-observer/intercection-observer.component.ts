import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'm-intercection-observer',
    templateUrl: './intercection-observer.component.html',
    styleUrls: ['./intercection-observer.component.less']
})
export class IntercectionObserverComponent implements OnInit {

    public items = [
        {show: true},
        {show: false},
        {show: false},
        {show: false},
        {show: false},
        {show: false},
        {show: false},
        {show: false},
        {show: false},
    ];

    ngOnInit() {
    }

}
