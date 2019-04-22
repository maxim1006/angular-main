import {Injectable} from '@angular/core';
import {Observable, Subject, timer} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {domenTokenDb} from '../../../shared/tokens/tokens';
import {map, publishReplay, refCount, shareReplay, takeUntil} from 'rxjs/operators';
import {switchMap} from 'rxjs/internal/operators/switchMap';

export interface FamilyMemberModel {
    'name': string;
    'age': number;
    'sex': string;
    'id': string;
}


@Injectable({
    providedIn: 'root'
})

export class RxCacheService {

    data$: Observable<FamilyMemberModel[]>;

    constructor(private httpClient: HttpClient) {}

    // Get data from server | HTTP GET
    getFamily(): Observable<FamilyMemberModel[]> {

        // Cache it once if data value is false
        if (!this.data$) {
            this.data$ = this.httpClient.get<FamilyMemberModel[]>(`${domenTokenDb}family`).pipe(
                map(data => data),
                publishReplay(1), // this tells Rx to cache the latest emitted from ['a', 'b', 'c'] храню только с
                refCount() // and this tells Rx to keep the Observable alive as long as there are any Subscribers, умрет когда я сделаю unsubscribe у подписчика
            );
        }

        return this.data$;
    }

    // Clear configs
    clearCache() {
        this.data$ = null;
    }

}
