import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from "@ngrx/effects";
import {FamilyActionTypes, FamilyLoadFailureAction, FamilyLoadSuccessAction} from "../actions/family.action";
import {Observable} from "rxjs";
import {Action} from "@ngrx/store";
import {HttpClient} from "@angular/common/http";
import {catchError, map, mergeMap} from "rxjs/operators";
import {domenToken} from "../../../shared/tokens/tokens";
import {FamilyMember} from "../../components/ngrx-effects.component";
import {of} from "rxjs/internal/observable/of";

@Injectable()
export class FamilyEffect {

    constructor(
        private http: HttpClient,
        private actions$: Actions
    ) {}

    @Effect()
    loadFamily$: Observable<Action> = this.actions$.pipe(
        ofType(FamilyActionTypes.Load),
        mergeMap(action =>
            this.http.get(`${domenToken}family.json`).pipe(
                map((data: FamilyMember[]) => (new FamilyLoadSuccessAction(data))),
                catchError(err => of(new FamilyLoadFailureAction(err)))
            )
    ));
}
