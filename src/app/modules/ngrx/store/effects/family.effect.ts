import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Observable, of} from "rxjs";
import {Action, select, Store} from "@ngrx/store";
import {HttpClient} from "@angular/common/http";
import {catchError, map, switchMap, withLatestFrom, auditTime, distinctUntilChanged} from "rxjs/operators";
import * as fromFamilyActions from "../actions/family.action";
import * as fromFamilySelectors from "../selectors/family.selector";
import {FamilyMember} from "../../models/family.model";
import {MFamilyService} from "../../services/family.service";
import {State} from "../reducers";


@Injectable()
export class FamilyEffects {

    constructor(
        private http: HttpClient,
        private actions$: Actions,
        private mFamilyService: MFamilyService,
        private store: Store<State>
    ) {}

    @Effect()
    loadFamily$: Observable<Action> = this.actions$.pipe(
        ofType<{ type: fromFamilyActions.FamilyActionTypes.Load; payload: FamilyMember[];}>(fromFamilyActions.FamilyActionTypes.Load),
        map(action => action.payload),
        withLatestFrom(this.store.pipe(select(fromFamilySelectors.getFamilyLoaded))),
        switchMap(([payload, familyLoaded]) => {
            return this.mFamilyService.getFamily().pipe(
                map((data: FamilyMember[]) => {
                    return new fromFamilyActions.LoadFamilySuccessAction(data);
                }),
                catchError(err => of(new fromFamilyActions.LoadFamilyFailAction(err)))
            )
        }
    ));

    @Effect()
    searchFamilyMembers$: Observable<Action> = this.actions$.pipe(
        ofType<{type: fromFamilyActions.FamilyActionTypes.ServerSearch; payload: string;}>(fromFamilyActions.FamilyActionTypes.ServerSearch),
        map(action => action.payload),
        switchMap(payload =>
            this.mFamilyService.searchMembers(payload).pipe(
                map((data: FamilyMember[]) => {
                    return new fromFamilyActions.FamilyServerSearchSuccessAction(data);
                }),
                catchError(err => of(new fromFamilyActions.FamilyServerSearchFailAction(err)))
            )
        )
    )
}
