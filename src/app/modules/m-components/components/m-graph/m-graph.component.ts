import {
    Component,
    OnInit,
    HostBinding,
    NgZone,
    ElementRef,
    AfterViewInit,
    Input,
} from "@angular/core";
import * as Highcharts from "highcharts";

require("highcharts/highcharts-more")(Highcharts);

@Component({
    selector: "m-graph",
    templateUrl: "m-graph.component.html",
})
export class MGraphComponent implements OnInit, AfterViewInit {
    private _viewInited = false;

    @Input()
    public get model(): Highcharts.ChartObject {
        return this._model;
    }

    public set model(value: Highcharts.ChartObject) {
        this._model = value;
        this._updateGraph(this._model);
    }

    private _model: Highcharts.ChartObject;

    public el: HTMLElement;

    @HostBinding("class.m-graph") classes = true;

    constructor(private _elRef: ElementRef, private _zone: NgZone) {}

    ngOnInit() {}

    ngAfterViewInit(): void {
        const self = this;

        self._viewInited = true;
        self.el = self._elRef.nativeElement;
        self._updateGraph(self._model);
    }

    private _updateGraph(value: Highcharts.ChartObject) {
        const self = this;

        if (value && self._viewInited) {
            self._zone.runOutsideAngular(() => {
                Highcharts.chart(self.el, <any>value);
            });
        }
    }
}
