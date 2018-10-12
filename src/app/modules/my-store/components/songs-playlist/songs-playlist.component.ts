import {Component, OnDestroy, OnInit} from '@angular/core';
import {MyStore} from "../../my-store";
import {MyStoreService} from "../../services/my-store.service";
import {Observable, Subject} from "rxjs/index";
import {takeUntil} from "rxjs/internal/operators";

@Component({
    selector: 'songs-playlist',
    template: `
    
        <p>Playlist</p>
        <songs-list [songs]="playlist$ | async" (toggleSong)="onSongToggle($event)"></songs-list>
    
    `
})

export class SongsPlayListComponent implements OnInit, OnDestroy {
    private playlist$: Observable<any>;
    private destroy$: Subject<any> = new Subject();
    constructor(private store: MyStore, private myStoreService: MyStoreService) {
    }

    ngOnInit() {
        this.playlist$ = this.store.select("playlist");
        this.myStoreService.getPlayList$.pipe(takeUntil(this.destroy$)).subscribe();
    }

    onSongToggle(song) {
        this.myStoreService.toggleSong(song)
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
