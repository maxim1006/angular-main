import {Component, HostBinding, OnInit} from '@angular/core';
import {SlideToggleEvent} from '../../../shared/directives/slide-toggle/slide-toggle.directive';

@Component({
    selector: 'slide-toggle',
    template: `
        <h2 (tap)="toggled = !toggled">Slide toggle directive</h2>
        {{toggled}}
        <div class="slide-toggle__inner" 
             (onSlideStart)="_onSlideStart($event)" 
             (onSlideEnd)="_onSlideEnd($event)" 
             (onSlideTick)="_onSlideTick($event)" 
             [slideToggle]="toggled"
        >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam at blanditiis deleniti deserunt doloremque doloribus illum iusto natus necessitatibus obcaecati odit perferendis provident quibusdam quidem, repellendus, reprehenderit repudiandae sequi.</div>
    `
})

export class MSlideToggleComponent implements OnInit {
    @HostBinding('class')
    public class = 'slide-toggle';

    public toggled = true;

    constructor() {}

    ngOnInit() {}

    _onSlideStart(event: SlideToggleEvent) {
        console.log(event, ' _onSlideStart');
    }

    _onSlideEnd(event: SlideToggleEvent) {
        console.log(event, ' _onSlideEnd');
    }

    _onSlideTick(event: SlideToggleEvent) {
        console.log(event, ' _onSlideTick');
    }
}
