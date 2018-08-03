//import { Component, OnInit } from "@angular/core";
import { Component, OnInit, Inject } from "@angular/core"; //это расширенная запись
import {NgForExampleWithObjectService} from "./ng-for-example-with-object.service"

@Component({
    selector: "ng-for-example-with-object",
    templateUrl: "./ng-for-example-with-object.html",
    providers: [NgForExampleWithObjectService]
    //providers: [{provide: 'family', useClass: NgForExampleWithObjectService}, {provide: 'url', useValue: 'http://example.com'}] //это расширенная запись обычного провайда и токена, могу делать сколько угодно значений. Также для этих целей используется opaqueToken. Т.е. можно использовать useClass, useValue, useFactory
})

export class NgforExampleWithObjectComponent {
    public family;

    constructor(private ngForExampleService:NgForExampleWithObjectService) {}
    //  constructor(
    //      @Inject('family') private ngForExampleService,
    //      @Inject('url') private url,
    //      @Inject('tokens') private tokens
    //  ) {} //это расширенная запись

    ngOnInit(): void {
        console.dir(this.ngForExampleService.getFamily());
        this.ngForExampleService.getFamily().subscribe(family => {
            // console.log(family);
            this.family = family
        });

        //console.log(this.tokens.domenToken);
    }

}