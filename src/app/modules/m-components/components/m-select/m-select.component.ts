import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'm-select',
    templateUrl: 'm-select.component.html'
})
export class MSelectComponent {
    @Input() options: any;
    @Input() customStyle: { [key: string]: string };
    @Input() selectedOption: any;

    @Output() selectedOptionOutput = new EventEmitter();

    panelVisible = false;

    ngAfterViewInit() {
        if (this.options && this.options.length && !this.selectedOption) {
            this.selectedOption = this.options[0];
        }
    }

    itemClick(event: Event, option: any) {
        this.panelVisible = false;
        this.selectedOption = option;
        this.selectedOptionOutput.emit(option);
    }

    headerClick(event: Event) {
        this.panelVisible = !this.panelVisible;
    }

    blur() {
        this.panelVisible = false;
    }

    trackByFn(index: number, item: any) {
        return index;
    }

}
