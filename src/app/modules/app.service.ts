import {Injectable} from '@angular/core';

@Injectable()
export class AppService {

    public name: string = "AppService";

    constructor() {
        console.log(`Service ${this.name} is inited`);
    }
}