import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'content-editable',
    templateUrl: 'content-editable.component.html'
})

export class ContentEditableComponent implements OnInit {

    public text: string;

    constructor() {
        this.text = 'Content editable text'
    }

    ngOnInit() {
    }

}
