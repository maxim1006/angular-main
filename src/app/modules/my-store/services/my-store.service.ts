import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MyStore} from '../my-store';
import {domenToken} from '../../shared/tokens/tokens';
import {tap} from 'rxjs/internal/operators';

@Injectable()
export class MyStoreService {

    constructor(private http: HttpClient, private store: MyStore) {
    }

    getPlayList$ = this.http
        .get(domenToken + 'songs')
        .pipe(tap((data) => {
            this.store.set('playlist', data);
        }));

    toggleSong(data) {
        this.http
            .put(domenToken + `songs/${data.song.id}`, data.song)
            .subscribe((song) => {
                const value = this.store.value.playlist;

                const playlist = value.map((currentSong) => {
                    if (currentSong.id === data.song.id) {
                        return {...currentSong, ...data.song };
                    } else {
                        return currentSong;
                    }
                });

                this.store.set('playlist', playlist);
            });

    }
}
