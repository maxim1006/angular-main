import {Component, ElementRef, HostBinding, NgZone, ViewChild} from "@angular/core";
import * as Hammer from "hammerjs";

@Component({
    selector: "hammer-example",
    templateUrl: "./hammer-example.component.html"
})
export class HammerExampleComponent {
    public panString: string = '';
    public isSwiped: boolean;

    private lastPosX = 0;
    private lastPosY = 0;
    private hammerManager: any;

    @ViewChild("draggableArea") draggableArea: ElementRef;
    @ViewChild("draggableContent") draggableContent: ElementRef;


    private _styleClass: string = '';
    private draggableAreaCoords: { x: any; y: any; w: any; h: any; };

    @HostBinding('class')
    get styleClass() {
        return this._styleClass || 'hammer-example';
    }

    set styleClass(value: string) {
         this._styleClass = 'hammer-example' + value;
    }

    onTap(event: any) {
        this.panString += ' taped!';
        this.styleClass = this.panString;
    }

    onSwipe(event: any) {
        this.isSwiped = !this.isSwiped;
    }

    constructor(private zone: NgZone) {
    }

    public ngAfterViewInit(): void {
        let self = this;

        self.zone.runOutsideAngular(() => {
            const element = self.draggableArea.nativeElement;

            self.hammerManager = new Hammer.Manager(element);
            self.hammerManager.add(new Hammer.Pan({direction: Hammer.DIRECTION_ALL, threshold: 0}));
            self.hammerManager.on("pan", self._handleDrag);
        });

        let draggableAreaElement = self.draggableArea.nativeElement,
            draggableAreaElementRect = draggableAreaElement.getBoundingClientRect();

        self.draggableAreaCoords = {
            x: draggableAreaElementRect.left + pageXOffset,
            y: draggableAreaElementRect.top + pageYOffset,
            w: draggableAreaElement.offsetWidth,
            h: draggableAreaElement.offsetHeight
        };

        console.dir(self.draggableAreaCoords);
    }

    ngOnDestroy() {
        this.hammerManager.off("pan", this._handleDrag);
        this.hammerManager.destroy();
    }

    private _handleDrag = this.handleDrag.bind(this);

    private handleDrag(event: any): void {
        const self = this,
            posX = event.deltaX + self.lastPosX,
            posY = event.deltaY + self.lastPosY;

        self.draggableContent.nativeElement.style.transform = "translate3d(" + posX + "px," + posY + "px, 0)";

        if (event.isFinal) {
            self.lastPosX = posX;
            self.lastPosY = posY;
        }
    }
}
