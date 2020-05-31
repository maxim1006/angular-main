import { Component } from "@angular/core";

@Component({
    selector: "m-resize-observer",
    template: `
        <div
            mResizeObserver
            class="m-resize-observer__observed-block"
            (resize)="resize($event)"
            (resizeEnd)="resizeEnd($event)"
        >
            Observe resize in console log
        </div>
    `,
    styles: [
        `
            .m-resize-observer__observed-block {
                display: block;
                width: 80%;
                height: 300px;
                border: 1px solid;
            }
        `,
    ],
})
export class MResizeObserverComponent {
    resize(e) {
        console.log("onResize");

        /**
         * target: div.m-resize-observer__observed-block
         contentRect: DOMRectReadOnly
         x: 0
         y: 0
         width: 788.796875
         height: 300
         top: 0
         right: 788.796875
         bottom: 300
         left: 0
         */
        // console.log("onResize", e);
    }

    resizeEnd(e) {
        console.log("resizeEnd ", e);
    }
}
