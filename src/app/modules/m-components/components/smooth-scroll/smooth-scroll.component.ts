import {Component} from '@angular/core';
import smoothscroll from 'smoothscroll-polyfill';

@Component({
  selector: 'm-smooth-scroll',
  templateUrl: './smooth-scroll.component.html',
  styleUrls: ['./smooth-scroll.component.less']
})
export class SmoothScrollComponent {
    constructor() {
        // Так как behaviour не работает в ослике и сафари
        smoothscroll.polyfill();
    }

    _click(headerNumber: number) {
        document.querySelector(`.m-smooth-scroll__header.__header${headerNumber}`)
            .scrollIntoView({
                behavior: 'smooth'
            });
    }

}
//
// window.scroll({
//     top: 2500,
//     left: 0,
//     behavior: 'smooth'
// });
//
// window.scrollBy({
//     top: 100, // could be negative value
//     left: 0,
//     behavior: 'smooth'
// });
