import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
@Component({
    selector: 'detect-property-change',
    templateUrl: 'detect-property-change.component.html'
})
export class DetectPropertyChangeComponent implements OnChanges {

    @Input() visible: boolean;

    constructor() {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.visible) {
            console.log(`Property visible changed to ${changes.visible.currentValue}`);
        }
    }

}
