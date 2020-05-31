import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from "@angular/core";

@Component({
    selector: "songs-list",
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <ul style="display: flex;flex-wrap: wrap;">
            <li
                style="margin: 0 30px 30px 0"
                *ngFor="let song of songs; index as i"
            >
                {{ song.author }}: {{ song.name }}<br />
                <div (click)="toggleItem(i, 'listened')">
                    listened: {{ song.listened }}
                </div>
                <div (click)="toggleItem(i, 'favourite')">
                    favourite: {{ song.favourite }}
                </div>
            </li>
        </ul>
    `,
})
export class SongsListComponent implements OnInit {
    @Input()
    songs: any[];

    @Input()
    type: string;

    @Output()
    toggleSong = new EventEmitter<any>();

    toggleItem(index: number, type: string) {
        const song = this.songs[index];

        this.toggleSong.emit({
            song: {
                ...song,
                [type]: !song[type],
            },
        });
    }

    ngOnInit() {}
}
