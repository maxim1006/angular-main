import {Component, OnInit, HostBinding} from '@angular/core';

@Component({
    selector: 'm-framework',
    templateUrl: './m-framework.component.html'
})

export class MFrameworkComponent implements OnInit {

    @HostBinding('class.framework-component')
    addClass = true;
    public detectVisiblePropertyChange: boolean;

    public constructor() {
        console.log('start');
    }

    public title = 'app works!';

    public onClick(e): void {
        console.log(e);
    }

    public person = {
        name: 'Max'
    };

    public getValue(): number {
        return 12;
    }

    public detectPropertyChange() {
         this.detectVisiblePropertyChange = !this.detectVisiblePropertyChange;
    }

    ngOnInit() {
    }

    /** @internal */
    public _outputListener() {}

}
