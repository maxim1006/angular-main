import {NgModule} from '@angular/core';
import {MyStoreComponent} from './my-store.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {MyStore} from './my-store';
import {HttpClientModule} from '@angular/common/http';
import {SongsFavouritesComponent} from './components/songs-favourites/songs-favourites.component';
import {SongsListenedComponent} from './components/songs-listened/songs-listened.component';
import {SongsPlayListComponent} from './components/songs-playlist/songs-playlist.component';
import {MyStoreService} from './services/my-store.service';
import {SongsListComponent} from './components/songs-list/songs-list.component';

const routes: Routes = [
    {path: '', component: MyStoreComponent},
];


@NgModule({
    imports: [SharedModule, RouterModule.forChild(routes), HttpClientModule],
    exports: [],
    declarations: [MyStoreComponent, SongsFavouritesComponent, SongsListenedComponent, SongsPlayListComponent, SongsListComponent],
    providers: [MyStore, MyStoreService],
})
export class MyStoreModule {
}
