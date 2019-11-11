import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {shareReplay, tap} from 'rxjs/operators';
import {domenToken} from '../shared/tokens/tokens';


export interface User<T> {
    [key: string]: T;
}


@Injectable({
    providedIn: "root"
})
export class AuthService {
    constructor(private http: HttpClient) {}

    login({login, password}) {
        return this.http
            .post<{expiresIn: string; idToken: string}>(`${domenToken}login`, {login, password})
            .pipe(
                tap(res => {
                    this.setSession(res);
                }),
            // делаю горячий обзервбл и возвращаю всем новым подписчикам значение логина
                shareReplay()
            );
    }

    getAuthData() {
        return this.http.get<string>(`${domenToken}login/data`);
    }

    setSession({expiresIn, idToken}) {
        const date = new Date();
        const expiresAt = date.setSeconds(date.getSeconds() + expiresIn);

        localStorage.setItem('id_token', idToken);
        localStorage.setItem("expires_at", JSON.stringify(+expiresAt));
    }

    logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
    }

    public isLoggedIn() {
        const now = new Date();
        return now < this.getExpirationDate();
    }

    isLoggedOut(): boolean {
        return !this.isLoggedIn();
    }

    getExpirationDate(): Date {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return new Date(expiresAt);
    }
}
