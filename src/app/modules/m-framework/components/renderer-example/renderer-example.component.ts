import {Component, OnInit, Renderer2} from '@angular/core';

@Component({
    selector: 'renderer-example',
    templateUrl: 'renderer-example.component.html'
})

export class RendererExampleComponent implements OnInit {
    constructor(private renderer: Renderer2) {
    }

    private documentClickListener: Function;

    ngOnInit() {
        this.documentClickListener = this.renderer.listen('body', 'click', () => {
            console.log('body click');
        });
    }

    private unbindDocumentClickListener(): void {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }

    ngOnDestroy() {
        this.unbindDocumentClickListener();
    }
}
