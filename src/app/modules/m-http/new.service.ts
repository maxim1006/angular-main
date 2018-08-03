import {Injectable} from "@angular/core";

@Injectable()
export class NewService {
    private anotherValue: number;

    constructor(private newService2: NewService2) {
        this.anotherValue = newService2.value;
    }
    private value:number = 1;
}

@Injectable()
export class NewService2 {
    public value:number = 2;
}