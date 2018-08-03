import {Injectable} from "@angular/core";
import {CanActivate} from "@angular/router";

@Injectable()
export class MAdminGuardService implements CanActivate {
    canActivate() {
        return JSON.parse(localStorage.getItem("admin"));
    }
}