import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs/index";
import {MyStore} from "../../my-store";
import {MyStoreService} from "../../services/my-store.service";
import {filter, map, takeUntil} from "rxjs/internal/operators";

@Component({
    selector: 'songs-favourites',
    template: `
    
        <p>Favourites</p>
        <songs-list type="favourite" (toggleSong)="onSongToggle($event)" [songs]="favourites$ | async"></songs-list>
    `
})

export class SongsFavouritesComponent implements OnInit {
    public favourites$: Observable<any>;
    private destroy$: Subject<any> = new Subject();
    constructor(private store: MyStore, private myStoreService: MyStoreService) {
    }

    ngOnInit() {
        this.favourites$ = this.store.select("playlist").pipe(
            filter(Boolean),
            map((playlist) => playlist.filter((song) => song.favourite))
        );
    }

    onSongToggle(song) {
        this.myStoreService.toggleSong(song)
    }
}
