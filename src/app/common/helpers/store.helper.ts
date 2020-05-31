import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { select$ } from "./select.helper";
import { deepFreeze, naiveObjectComparison } from "./common.helper";

interface UserData {
    userName?: string;
    age?: number;
    messages?: Message[];
}

interface Message {
    date: Date;
    body: string;
}

export class Store<T> extends BehaviorSubject<T> {
    constructor(initialData: T) {
        super(deepFreeze(initialData));
    }

    next(newData: T): void {
        const frozenData = deepFreeze(newData);
        if (!naiveObjectComparison(frozenData, this.getValue())) {
            super.next(frozenData);
        }
    }
}

const USER_DATA_INIT = {};

@Injectable({
    providedIn: "root",
})
export class UserService {
    private userData$: Store<UserData>;

    public userName$: Observable<string>;
    public age$: Observable<number>;
    public messages$: Observable<Message[]>;

    constructor(private http: HttpClient) {
        this.userData$ = new Store(USER_DATA_INIT);

        this.userName$ = select$(this.userData$, userData => userData.userName);

        this.age$ = select$(this.userData$, userData => userData.age);

        this.messages$ = select$(this.userData$, userData => userData.messages);
    }

    fetchUserData() {
        return this.http
            .get<UserData>("http://some-user-api.com")
            .subscribe(userData => this.userData$.next(userData));
    }
}
