import {Component, HostBinding, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'm-svg',
    template: `
        <svg class="m-svg__svg" viewBox="0 0 16 18" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.6500271,7.36499351 C10.3700271,2.45799351 9.18402715,0.593993512 5.45902715,0.671993512 C4.13202715,0.698993512 4.45002715,-0.290006488 3.43802715,0.0849935124 C2.42802715,0.459993512 3.29502715,1.00899351 2.26102715,1.85799351 C-0.640972853,4.24099351 -0.373972853,6.44499351 0.972027147,11.6979935 C1.53902715,13.9109935 -0.394972853,14.0189935 0.370027147,16.1629935 C0.929027147,17.7269935 5.04902715,18.3819935 9.39502715,16.7699935 C13.7420271,15.1569935 16.4810271,11.9559935 15.9220271,10.3919935 C15.1570271,8.24699351 13.6110271,9.43099351 12.6500271,7.36499351 Z M8.92402715,15.4479935 C5.04202715,16.8879935 1.85202715,16.0419935 1.71702715,15.6649935 C1.48502715,15.0149935 2.97002715,12.8489935 7.40802715,11.2019935 C11.8460271,9.55499351 14.3230271,10.1659935 14.5820271,10.8909935 C14.7350271,11.3199935 12.8070271,14.0069935 8.92402715,15.4479935 Z M7.67602715,11.9539935 C5.64702715,12.7069935 4.23702715,13.5679935 3.32302715,14.3429935 C3.96602715,14.9269935 5.17002715,15.0689935 6.36902715,14.6239935 C7.89602715,14.0589935 8.83502715,12.7579935 8.46402715,11.7199935 C8.45902715,11.7069935 8.45302715,11.6969935 8.44802715,11.6839935 C8.19702715,11.7659935 7.94002715,11.8549935 7.67602715,11.9539935 Z"></path>
        </svg>
    `,
    styleUrls: ['./svg.component.less'],
    encapsulation: ViewEncapsulation.None
})

export class MSvgComponent {
    @HostBinding('class.m-svg')
    hostClass = true;
}