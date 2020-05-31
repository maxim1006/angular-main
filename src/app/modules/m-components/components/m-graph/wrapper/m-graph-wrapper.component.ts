import { Component, HostBinding } from "@angular/core";
import {
    ActivityByJourneyTypeGraphModel,
    CustomerProfileGraphModel,
    DatabaseActivityGraphModel,
    InboundActivityGraphModel,
    JourneysLifecycleGraphModel,
    JourneysStatsGraphModel,
    StepDurationGraphModel,
    SuccessRateCCGraphModel,
    SuccessRateCustomerGraphModel,
} from "@models/m-graph.model";

declare namespace Highcharts {
    export interface ChartObject {
        [key: string]: any;
    }
}

@Component({
    selector: "m-graph-wrapper",
    templateUrl: "m-graph-wrapper.component.html",
})
export class MGraphWrapperComponent {
    @HostBinding("class.m-graph-wrapper") classes = true;

    public _stepDurationGraphModel:
        | Highcharts.ChartObject
        | any = StepDurationGraphModel;
    public _successRateCustomerGraphModel:
        | Highcharts.ChartObject
        | any = SuccessRateCustomerGraphModel;
    public _successRateCCGraphModel:
        | Highcharts.ChartObject
        | any = SuccessRateCCGraphModel;
    public _customerProfileGraphModel:
        | Highcharts.ChartObject
        | any = CustomerProfileGraphModel;
    public _journeysStatsGraphModel:
        | Highcharts.ChartObject
        | any = JourneysStatsGraphModel;
    public _activityByJourneyTypeGraphModel:
        | Highcharts.ChartObject
        | any = ActivityByJourneyTypeGraphModel;
    public _inboundActivityGraphModel:
        | Highcharts.ChartObject
        | any = InboundActivityGraphModel;
    public _journeysLifecycleGraphModel:
        | Highcharts.ChartObject
        | any = JourneysLifecycleGraphModel;
    public _databaseActivityGraphModel:
        | Highcharts.ChartObject
        | any = DatabaseActivityGraphModel;
}
