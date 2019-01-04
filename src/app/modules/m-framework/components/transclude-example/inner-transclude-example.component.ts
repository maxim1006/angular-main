import {AfterViewInit, Component, ContentChild, ElementRef, ViewChild} from '@angular/core';

@Component({
    selector: 'inner-transclude-example',
    templateUrl: './inner-transclude-example.component.html'
})

export class InnerTranscludeExampleComponent implements AfterViewInit {

    @ContentChild('innerTranscludeExampleDiv') innerTranscludeExampleDivEl: ElementRef;

    constructor(private el: ElementRef) {}

    ngAfterViewInit() {
         console.log(this.innerTranscludeExampleDivEl, ' innerTranscludeExampleDivEl');
         console.log(this.el.nativeElement, ' el innerTranscludeExampleDivEl');
    }

}
