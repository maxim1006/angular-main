import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';


@Component({
    selector: 'm-admin',
    template: `
        <h3>Admin component</h3>
<!--        по таким ссылкам все равно перейдет даже с canDeativate-->
        <a href="http://google.com">google</a>
        <p></p>
        <a href="http://google.com"  rel="noopener noreferrer" target="_blank">google _blank</a>
    `
})
export class MAdminComponent {
    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        // window.onload = window.onunload = function analytics(event) {
        //     if (!navigator.sendBeacon) return;
        //
        //     var url = "https://example.com/analytics";
        //     // Create the data to send
        //     var data = "state=" + event.type + "&location=" + location.href;
        //
        //     // Send the beacon
        //     var status = navigator.sendBeacon(url, data);
        //
        //     // Log the data and result
        //     console.log("sendBeacon: URL = ", url, "; data = ", data, "; status = ", status);
        // };

        if (isPlatformBrowser(this.platformId)) {
            window.addEventListener('beforeunload', (e) => {
                e.preventDefault();
                e.returnValue = 'Are you sure you want away?';
            });

            window.onunload = function (event) {
                console.log('left page');
            };
        }
    }
}

