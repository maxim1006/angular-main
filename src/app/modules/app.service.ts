import {Injectable} from '@angular/core';

@Injectable()
export class AppService {

    public name = 'AppService';

    constructor() {
        console.log(`Service ${this.name} is inited`);
    }
}
