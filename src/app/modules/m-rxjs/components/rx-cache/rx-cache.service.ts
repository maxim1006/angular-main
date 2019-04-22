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
    cache$: Observable<FamilyMemberModel[]>;
    private reload$ = new Subject<void>();

    constructor(private httpClient: HttpClient) {
    }

    // Get data from server | HTTP GET
    getFamily(): Observable<FamilyMemberModel[]> {

        // Cache it once if data value is false
        if (!this.data$) {
            this.data$ = this.httpClient.get<FamilyMemberModel[]>(`${domenTokenDb}family`).pipe(
                map(data => data),
                publishReplay(1), // this tells Rx to cache the latest emitted from ['a', 'b', 'c'] храню только с
                refCount() // and this tells Rx to keep the Observable alive as long as there are any Subscribers
            );
        }

        return this.data$;
    }

    getFamily1(): Observable<FamilyMemberModel[]> {
        if (!this.cache$) {

            this.cache$ = this.httpClient.get<FamilyMemberModel[]>(`${domenTokenDb}family`)
                .pipe(
                    takeUntil(this.reload$),
                    shareReplay(1)
                );
        }

        return this.cache$;
    }

    // Clear configs
    clearCache() {
        this.data$ = null;
    }

    clearCache1() {
        // Calling next will complete the current cache instance
        this.reload$.next();

        // Setting the cache to null will create a new cache the
        // next time 'jokes' is called
        this.cache$ = null;
    }

}
