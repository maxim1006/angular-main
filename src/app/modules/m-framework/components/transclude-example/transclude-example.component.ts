//еще больше примеров https://scotch.io/tutorials/angular-2-transclusion-using-ng-content

import { Component, Input, TemplateRef } from "@angular/core";

@Component({
    selector: "transclude-example",
    templateUrl: "./transclude-example.component.html",
})
export class TranscludeExampleComponent {
    @Input()
    public template: TemplateRef<any>;

    public _toggleNgContent = true;
}
