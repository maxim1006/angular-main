import {Component, OnInit, HostBinding, HostListener} from "@angular/core";

@Component(
    {
        selector: "host-binding",
        template: `
            <h3>This is @HostBindling example</h3>
            <p> &laquo;hostBinding&raquo; has id hostBinding</p>
        `,
        // host: {
        //     '(document:click)': 'onClickOut($event)',
        // "[class.ux-context-panel]": "true"
        // }
    }
)

export class HostBindingComponent implements OnInit {

    @HostBinding('attr.id') id: string = 'hostBinding';
    @HostBinding('class') classes = 'class1 class2 class3';

    @HostListener('document:click') onDocumentClick = () => {
        console.log("document clicked");
    };

    @HostListener('window:click') onWindowClick = () => {
        console.log("window clicked");
    };

    @HostListener('click', ['$event'])
    onClick(event: MouseEvent) {
        console.log(event, " clicked with host listener");
    }

    constructor() {

    }
    
    ngOnInit() {
        
    }

}