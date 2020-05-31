import { Component, OnInit } from "@angular/core";
import { state1Mixin } from "./mixin1.mixin";
import { state2Mixin } from "./mixin2.mixin";
import { destroyMixin } from "./destroy.mixin";
import { fromEvent, Subscription } from "rxjs";
import { auditTime, takeUntil } from "rxjs/operators";
import { inputMixin } from "./input.mixin";

@Component({
    selector: "m-mixins",
    // должен инпуты из миксинов тут прописывать иначе в аот не сработает
    inputs: ["inputMixin"],
    template: `
        {{ state | json }}
        {{ state2 | json }}
        <p>
            {{ inputMixin }}
        </p>
    `,
})
export class MixinsComponent
    extends state1Mixin(state2Mixin(destroyMixin(inputMixin(class {}))))
    implements OnInit {
    mousemove$: Subscription;

    ngOnInit() {
        console.log(this.state);
        console.log(this.getState());
        console.log(this.state2);
        console.log(this.getState2());

        // this.destroy$ забираю из миксина и если перейти на другую табу то теперь маусмув умрет
        this.mousemove$ = fromEvent(document, "mousemove")
            .pipe(auditTime(1000), takeUntil(this.destroy$))
            .subscribe(e => console.log(e));
    }
}
