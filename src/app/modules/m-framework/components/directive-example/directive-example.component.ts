import { Component, OnInit } from "@angular/core";

@Component({
    selector: "m-directive-example",
    template: `
        <!--Здесь mColory использую как сслыку на контроллер директивы, для этого в директиве должно быть exportAs-->
        <h1 mColory #c="mColory">View</h1>
        Set color:
        <input
            autofocus
            type="text"
            (input)="c.changeColor($event.target.value)"
            style="border: 1px solid"
        />

        <!--
        так можно работать с контроллером формы
        #f='form'
        -->
    `,
})
export class MDirectiveExampleComponent {}
