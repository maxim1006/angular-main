import {Directive, HostBinding} from '@angular/core';

@Directive({
    selector: "[mColory]",
    exportAs: "mColory"
})
export class MColoryDirective {

    @HostBinding("style.color")
    public color: string = "red";

    public changeColor(color: string) {
        this.color = color;
    }
}
