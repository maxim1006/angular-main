import {Component, ElementRef, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
    selector: 'ng-template-example',
    templateUrl: './ngTemplateExampleComponent.html'
})

export class NgTemplateExampleComponent {
    public constructor() {
    }

    @ViewChild('tmpl')
    public _tmpl: TemplateRef<any>;

    @ViewChild('someDiv', {read: ViewContainerRef})
    public _someDiv: ViewContainerRef;

    ngAfterContentInit() {
        // this._tmpl встанет сразу после this._someDiv
        this._someDiv.createEmbeddedView(this._tmpl, {
            $implicit: 'Max', // указав $implicit могу сделать любой let-что-то и это что-то будет implicit, например <ng-template #tmpl let-name> тут hame будет равно Max несмотря на то что явно его не указал
            city: 'Moscow'
        });
    }
}
