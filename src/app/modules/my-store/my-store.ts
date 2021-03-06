/*
 *    store.set('todos', [{}, {}, {}]); - добавляю дату в стор
 *
 *    store.select('todos'); - так достаю дату
 *
 * */

import { BehaviorSubject, Observable } from "rxjs";
import { MyState } from "./my-state";
import { distinctUntilChanged, pluck } from "rxjs/operators";
import { Injectable } from "@angular/core";

const myState: MyState = {
    playlist: undefined,
};

@Injectable()
export class MyStore {
    private subject = new BehaviorSubject<MyState>(myState);
    private store = this.subject.asObservable().pipe(distinctUntilChanged());

    get value() {
        return this.subject.value;
    }

    set(name: string, state: any) {
        this.subject.next({
            ...this.value,
            [name]: state,
        });
    }

    select<T>(name: string): Observable<T> {
        return this.store.pipe(pluck(name));
    }
}
