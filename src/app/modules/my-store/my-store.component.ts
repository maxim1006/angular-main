import {Component, OnInit} from '@angular/core';
import {MyStore} from './my-store';

@Component({
    selector: 'my-store',
    template: `
        <h3>My store</h3> 
        
        <songs-favourites></songs-favourites>
        <songs-listened></songs-listened>
        <songs-playlist></songs-playlist>
    `
})

export class MyStoreComponent implements OnInit {
    constructor(private store: MyStore) {
    }

    todos$ = this.store.select<any>('todos');

    ngOnInit() {
        this.store.set('todos', [{name: 'learn'}, {name: 'sleep'}]);
    }
}
