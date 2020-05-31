import { Component, ComponentRef, HostBinding, OnInit } from "@angular/core";
import { MDynamicComponentConstructor } from "./components/m-dynamic/m-dynamic.component";
import { MCheckboxComponent } from "./components/m-checkbox/m-checkbox.component";
import { ProgressBarComponent } from "src/app/modules/m-components/components/progress-bar/progress-bar.component";
import { MSelectComponent } from "./components/m-select/m-select.component";

@Component({
    selector: "m-components",
    templateUrl: "./m-components.component.html",
})
export class MComponentsComponent implements OnInit {
    dynamicModel: MDynamicComponentConstructor;

    @HostBinding("style.padding") margin = "20px";
    @HostBinding("style.display") display = "block";

    public autocomplete: any;
    public currentAutocompleteItem: any;

    public _checked = true;

    ngOnInit() {
        setTimeout(() => {
            this.autocomplete = [
                { name: "Max" },
                { name: "Aliya" },
                { name: "Anton" },
            ];
            // console.log('autocomplete model loaded');
        }, 2000);

        this.dynamicModel = new MDynamicComponentConstructor(
            MCheckboxComponent,
            {
                text: "dynamic checkbox",
                checked: true,
            }
        );

        // setInterval(() => {
        //     console.log(this.currentAutocompleteItem);
        // }, 1000)
    }

    treeClick(e: any) {
        console.log("tree click ", e);
    }
}
