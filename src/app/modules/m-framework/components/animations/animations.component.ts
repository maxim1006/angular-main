import { Component } from "@angular/core";
import {
    animate,
    query,
    state,
    style,
    transition,
    trigger,
} from "@angular/animations";

@Component({
    selector: "m-animations",
    templateUrl: "animations.component.html",
    animations: [
        trigger("myAnimation", [
            state("active", style({ color: "red" })),
            state("inactive", style({ color: "blue" })),
            transition(
                "active => inactive",
                animate("1000ms ease-in", style({ color: "blue" }))
            ),
            transition(
                "inactive => active",
                animate("1000ms ease-in", style({ color: "red" }))
            ),
            // transition('* => active', style({color: 'red'}))
        ]),
        trigger("myAnimation1", [
            transition(
                "active => inactive",
                query(
                    ".additional",
                    animate("1000ms ease-in", style({ opacity: 0 }))
                )
            ),
            transition(
                "inactive => active",
                query(
                    ".additional",
                    animate("1000ms ease-in", style({ opacity: 1 }))
                )
            ),
        ]),
    ],
})
export class MAnimationsComponent {
    /** @internal */
    public _animationState = "inactive";

    /** @internal */
    public _click(event: Event) {
        this._animationState =
            this._animationState === "active" ? "inactive" : "active";
    }
}
