import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
    selector: "custom-change-detection-inner",
    templateUrl: "custom-change-detection-inner.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CustomChangeDetectionComponentInner implements OnInit {

    @Input("obj") obj: {
        name?: string
    };

    @Input("name") name: string;

    ngOnInit() {

        if (this.obj) {
            this.obj.name = "changed inner name";
        }

    }
}
