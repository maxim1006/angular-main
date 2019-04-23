import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'm-network-effective-tipe',
    template: `Your networkType: {{networkType}}`,
    styleUrls: ['./network-effective-tipe.component.less']
})
export class NetworkEffectiveTipeComponent implements OnInit {

    networkType: string;

    constructor() {
    }

    ngOnInit() {
        this.networkType = navigator['connection'].effectiveType;
    }

}
