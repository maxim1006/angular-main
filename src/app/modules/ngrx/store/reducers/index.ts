// в данном случае это типо апп редюсеры
import * as fromRouter from '@ngrx/router-store';
import * as fromFamilyReducer from './family.reducer';
import * as fromCounterReducer from './counter.reducer';
import {ActivatedRouteSnapshot, Params, RouterStateSnapshot} from '@angular/router';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {RouterStateSerializer} from "@ngrx/router-store";


export interface RouterStateUrl {
    url: string;
    queryParams: Params;
    params: Params;
}

export interface State {
    routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
    counter: number;
    family: fromFamilyReducer.FamilyState;
}

export const reducers: ActionReducerMap<State> = {
    routerReducer: fromRouter.routerReducer,
    counter: fromCounterReducer.reducer,
    family: fromFamilyReducer.reducer
};

export const getFamilyState = createFeatureSelector<fromFamilyReducer.FamilyState>('family');

export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('routerReducer');


export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
    serialize(routerState: RouterStateSnapshot): RouterStateUrl {
        let route = routerState.root;

        while (route.firstChild) {
            route = route.firstChild;
        }

        const {
            url,
            root: { queryParams },
        } = routerState;
        const { params } = route;

        // Only return an object including the URL, params and query params
        // instead of the entire snapshot
        return { url, params, queryParams };
    }
}
