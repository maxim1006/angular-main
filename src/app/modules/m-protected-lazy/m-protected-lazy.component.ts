import {Component} from '@angular/core';

@Component({
    selector: 'm-protected-lazy',
    template: `
        Protected lazy module
    `,
    viewProviders: [] //чтобы ограничить доступ к сервису только из компоненты, а из внешних компонент доступа нет
})
export class MProtectedLazyComponent {
    constructor() {}
}

