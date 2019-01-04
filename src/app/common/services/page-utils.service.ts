import {Injectable} from "@angular/core";
import {Observable, Subscriber} from "rxjs";
import {Media} from "../models/media";
import {share} from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})
export class PageUtilsService {
    documentWidth: number = document.documentElement.clientWidth;
    TABLET_VIEW_WIDTH: number = 768;
    MOBILE_VIEW_WIDTH: number = 480;
    mediaObserver:Observable<Media>;
    mediaSubscriber:Subscriber<Media>;
    mediaData:Media = {
        mobile: false,
        tablet: false,
        desktop: false
    };

    constructor() {
        this.mediaObserver = Observable.create((subscriber: Subscriber<Media>) => {
            this.mediaSubscriber = subscriber;
            this.updateMediaData();
            this.mediaSubscriber.next(this.mediaData);
        }).pipe(share()); // share result to all subscriber, if delete only the last one will get it

        window.addEventListener('resize', () => {
            this.documentWidth = document.documentElement.clientWidth;
            this.updateMediaData();

            if (this.mediaSubscriber) {
                this.mediaSubscriber.next(this.mediaData);
            }
        });
    }

    getMedia() {
        return this.mediaObserver;
    }

    updateMediaData() {
        this.mediaData.mobile = this.documentWidth <= this.MOBILE_VIEW_WIDTH;
        this.mediaData.tablet = this.documentWidth > this.MOBILE_VIEW_WIDTH && this.documentWidth <= this.TABLET_VIEW_WIDTH;
        this.mediaData.desktop = this.documentWidth > this.TABLET_VIEW_WIDTH;
    }
}
