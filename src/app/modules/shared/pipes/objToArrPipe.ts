import { Pipe, PipeTransform } from '@angular/core';

@Pipe ({
    name: 'objToArrPipe'
})

export class objToArrPipe implements PipeTransform {

    public transform(value: any[] = [], name= ''): any {
        const arr = [];

        Object.keys(value).forEach((key) => {
            arr.push({
                key,
                value: value[key]
            });
        });

        return arr;
    }

}
