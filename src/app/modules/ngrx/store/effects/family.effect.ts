import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Observable} from "rxjs";
import {Action} from "@ngrx/store";
import {HttpClient} from "@angular/common/http";
import {catchError, map, mergeMap} from "rxjs/operators";
import {domenToken} from "../../../shared/tokens/tokens";
import {of} from "rxjs/internal/observable/of";
import * as fromFamilyActions from "../actions";
import {FamilyMember} from "../../models/family.model";

@Injectable()
export class FamilyEffects {

    constructor(
        private http: HttpClient,
        private actions$: Actions
    ) {}

    @Effect()
    loadFamily$: Observable<Action> = this.actions$.pipe(
        ofType(fromFamilyActions.FamilyActionTypes.Load),
        mergeMap(action =>
            this.http.get(`${domenToken}family`).pipe(
                map((data: FamilyMember[]) => {
                    console.log(data);
                    return new fromFamilyActions.LoadFamilySuccessAction(data);
                }
                ),
                catchError(err => of(new fromFamilyActions.LoadFamilyFailAction(err)))
            )
    ));
}
