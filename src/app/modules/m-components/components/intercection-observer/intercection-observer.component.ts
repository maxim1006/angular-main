import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'm-intercection-observer',
    templateUrl: './intercection-observer.component.html',
    styleUrls: ['./intercection-observer.component.less']
})
export class IntercectionObserverComponent implements OnInit {

    public items = [
        {show: true, height: this.getRandomHeight()},
        {show: false, height: this.getRandomHeight()},
        {show: false, height: this.getRandomHeight()},
        {show: false, height: this.getRandomHeight()},
        {show: false, height: this.getRandomHeight()},
        {show: false, height: this.getRandomHeight()},
        {show: false, height: this.getRandomHeight()},
        {show: false, height: this.getRandomHeight()},
        {show: false, height: this.getRandomHeight()},
    ];

    ngOnInit() {
    }

    private getRandomHeight(min: number = 100, max: number = 500): string {
        const randomNumber = min - 0.5 + Math.random() * (max - min + 1);

        return Math.round(randomNumber) + 'px';
    }
}
