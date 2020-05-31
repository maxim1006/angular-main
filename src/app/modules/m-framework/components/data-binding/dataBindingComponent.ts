import { Component, OnInit } from "@angular/core";

@Component({
    selector: "data-binding",
    templateUrl: "./dataBindingComponent.html",
})
export class DataBindingComponent implements OnInit {
    ngOnInit() {
        // setInterval(()=> {
        //     console.log(this.prop);
        // }, 3000)
    }

    //one-way binding
    public image = "http://grinz.ru/jquery/imagePreloading/images/14.jpg";
    public image1 = "http://grinz.ru/jquery/imagePreloading/images/11.jpg";

    public onImage1Click(): void {
        console.log("image1 clicked!");
    }

    public inputValue: string;

    public prop = {
        name: "Property from parent component",
    };

    public aliasProp = "alias prop";

    public onModelChange(): void {
        console.log(this.inputValue);
    }

    public onTwoWayClick(event): void {
        console.log(event);
        this.inputValue = event[0];
    }

    public onSelectItem(event): void {
        console.log("get item in parent directive: ", event);
    }
}
