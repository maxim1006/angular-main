import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'custom-structural-directive',
    template: `
    
        <div *customStructuralDirective>
            Delayed visible content
        </div>
        
    `
})

export class CustomStructuralDirectiveComponent implements OnInit {
    constructor() {
    }

    ngOnInit() {
    }
}
