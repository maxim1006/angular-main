import { Component } from "@angular/core";

@Component({
    selector: "pipe-example",
    templateUrl: "./pipeExampleComponent.html"
})

export class PipeExampleComponent {
    public filterString:string;
    public time:string = new Date().toString();

    family = [
        {
            name: "Max",
            age: 29,
            sex: "male"
        },
        {
            name: "Aliya",
            age: 30,
            sex: "female"
        },
        {
            name: "Anton",
            age: 30,
            sex: "male"
        }
    ];
}