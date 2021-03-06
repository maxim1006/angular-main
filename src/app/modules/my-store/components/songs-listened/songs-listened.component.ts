import { Component, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { MyStore } from "../../my-store";
import { MyStoreService } from "../../services/my-store.service";
import { filter, map, takeUntil } from "rxjs/operators";

@Component({
    selector: "songs-listened",
    template: `
        <p>Listened</p>
        <songs-list
            type="listened"
            [songs]="listened$ | async"
            (toggleSong)="onSongToggle($event)"
        ></songs-list>
    `,
})
export class SongsListenedComponent implements OnInit {
    public listened$: Observable<any>;
    private destroy$: Subject<any> = new Subject();
    constructor(
        private store: MyStore,
        private myStoreService: MyStoreService
    ) {}

    ngOnInit() {
        this.listened$ = this.store.select("playlist").pipe(
            filter(Boolean), // так проверяю есть ли дата в потоке
            map(playlist => (<any>playlist).filter(song => song.listened))
        );
    }

    onSongToggle(song) {
        this.myStoreService.toggleSong(song);
    }
}
