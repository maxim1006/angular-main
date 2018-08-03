import {Component, OnInit, HostBinding, NgZone, ElementRef, AfterViewInit, Input} from '@angular/core';
import * as Highcharts from "highcharts";

@Component({
    selector: 'm-sparkline-graph',
    templateUrl: 'm-sparkline-graph.component.html',
})

export class MSparklineGraphComponent implements OnInit, AfterViewInit {
    private _viewInited: boolean = false;

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

    @HostBinding('class.m-sparkline-graph') classes = true;

    constructor(private _elRef: ElementRef, private _zone: NgZone) {}

    ngOnInit() {}

    ngAfterViewInit(): void {
        let self = this;

        self._viewInited = true;
        self.el = self._elRef.nativeElement;
        self._updateGraph(self._model);
    }

    private _updateGraph(value: Highcharts.ChartObject) {
        let self = this;

        if ( self._viewInited) {
            self._zone.runOutsideAngular(() => {

                Highcharts["SparkLine"] = function (a, b, c) {
                    let hasRenderToArg = typeof a === 'string' || a.nodeName,
                        options = arguments[hasRenderToArg ? 1 : 0],
                        defaultOptions = {
                            chart: {
                                renderTo: (options.chart && options.chart.renderTo) || this,
                                backgroundColor: null,
                                borderWidth: 0,
                                type: 'area',
                                margin: [2, 0, 2, 0],
                                width: 120,
                                height: 20,
                                style: {
                                    overflow: 'visible'
                                },
                                skipClone: true
                            },
                            title: {
                                text: ''
                            },
                            credits: {
                                enabled: false
                            },
                            xAxis: {
                                labels: {
                                    enabled: false
                                },
                                title: {
                                    text: null
                                },
                                startOnTick: false,
                                endOnTick: false,
                                tickPositions: []
                            },
                            yAxis: {
                                endOnTick: false,
                                startOnTick: false,
                                labels: {
                                    enabled: false
                                },
                                title: {
                                    text: null
                                },
                                tickPositions: [0]
                            },
                            legend: {
                                enabled: false
                            },
                            tooltip: {
                                backgroundColor: null,
                                borderWidth: 0,
                                shadow: false,
                                useHTML: true,
                                hideDelay: 0,
                                shared: true,
                                padding: 0,
                                positioner: function (w, h, point) {
                                    return { x: point.plotX - w / 2, y: point.plotY - h };
                                }
                            },
                            plotOptions: {
                                series: {
                                    animation: false,
                                    lineWidth: 1,
                                    shadow: false,
                                    states: {
                                        hover: {
                                            lineWidth: 1
                                        }
                                    },
                                    marker: {
                                        radius: 1,
                                        states: {
                                            hover: {
                                                radius: 2
                                            }
                                        }
                                    },
                                    fillOpacity: 0.25
                                },
                                column: {
                                    negativeColor: '#910000',
                                    borderColor: 'silver'
                                }
                            }
                        };

                    options = Highcharts["merge"] && Highcharts["merge"](defaultOptions, options);

                    return new Highcharts.Chart(a, options, c);
                };

                let start = +new Date(),
                    tds: HTMLElement[] = [].slice.call(this.el.querySelectorAll('td[data-sparkline]')),
                    fullLen = tds.length,
                    n = 0;

                function doChunk() {
                    let time = +new Date(),
                        i,
                        len = tds.length,
                        td: HTMLElement,
                        stringdata,
                        arr,
                        data,
                        chart;

                    for (i = 0; i < len; i += 1) {
                        td = tds[i];
                        stringdata = td.dataset.sparkline;
                        arr = stringdata.split('; ');
                        data = arr[0].split(', ').map((item) => +item);
                        chart = {};

                        if (arr[1]) {
                            chart.type = arr[1];
                        }

                        new Highcharts['SparkLine'](td, self.model || {
                            series: [{
                                data: data,
                                pointStart: 1
                            }],
                            tooltip: {
                                headerFormat: '<span style="font-size: 10px">' + td.parentElement.querySelector('th').innerHTML + ', Q{point.x}:</span><br/>',
                                pointFormat: '<b>{point.y}.000</b> USD'
                            },
                            chart: chart
                        } as any, () => {});

                        n += 1;

                        let date = new Date() as any;

                        if (date - time > 500) {
                            tds.splice(0, i + 1);
                            setTimeout(doChunk, 0);
                            break;
                        }
                    }
                }
                doChunk();

            });
        }
    }
}

