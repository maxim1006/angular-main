import { Component } from "@angular/core";
import {from, Observable, of} from "rxjs/index";

@Component({
    selector: "pipe-example",
    templateUrl: "./pipeExampleComponent.html"
})

export class PipeExampleComponent {
    public filterString:string;
    public time:string = new Date().toString();

    files$: Observable<any>;

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

    ngOnInit() {
        this.files$ = of([
            {name: "file1", size: 24},
            {name: "file2", size: 48},
            {name: "file3", size: 96}
        ]);
    }
}
