import {Component} from '@angular/core';
import {getRandomInteger} from 'src/app/common/helpers/common.helper';

@Component({
    selector: 'm-intercection-observer',
    templateUrl: './intercection-observer.component.html',
    styleUrls: ['./intercection-observer.component.less']
})
export class IntercectionObserverComponent {

    public items = [
        {show: true, height: getRandomInteger() + 'px'},
        {show: false, height: getRandomInteger() + 'px'},
        {show: false, height: getRandomInteger() + 'px'},
        {show: false, height: getRandomInteger() + 'px'},
        {show: false, height: getRandomInteger() + 'px'},
        {show: false, height: getRandomInteger() + 'px'},
        {show: false, height: getRandomInteger() + 'px'},
        {show: false, height: getRandomInteger() + 'px'},
        {show: false, height: getRandomInteger() + 'px'},
    ];

    deferLoad($event, item) {
        console.log($event);
        item.show = $event;
    }
}
