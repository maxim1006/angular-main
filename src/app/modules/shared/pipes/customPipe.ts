//2 компонентыа - 2 разных инстанса пайпа

import { Pipe, PipeTransform } from '@angular/core';

@Pipe ({
    name: 'custom'
})

export class CustomPipe implements PipeTransform {

    public transform(value: any[] = [], name= ''): any {
        console.log(value, ' filtered ng-for');
        return value.filter((member) => {
            return member.name.toLowerCase().indexOf(name.toLowerCase()) !== -1;
        });
    }

}
