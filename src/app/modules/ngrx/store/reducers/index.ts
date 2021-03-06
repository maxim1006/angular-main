// в данном случае это типо апп редюсеры
import * as fromRouter from "@ngrx/router-store";
import * as fromCounterReducer from "./counter.reducer";
import * as fromFamilyReducer from "./family.reducer";
import {
    ActivatedRouteSnapshot,
    Params,
    RouterStateSnapshot,
} from "@angular/router";
import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
} from "@ngrx/store";
import { RouterStateSerializer } from "@ngrx/router-store";
import { Injectable } from "@angular/core";

export interface RouterStateUrl {
    url: string;
    queryParams: Params;
    params: Params;
}

export interface State {
    routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
    counter: fromCounterReducer.CounterState;
    family: fromFamilyReducer.FamilyState;
}

export const reducers: ActionReducerMap<State> = {
    routerReducer: fromRouter.routerReducer,
    counter: fromCounterReducer.reducer,
    family: fromFamilyReducer.reducer,
};

export const getCounterState = createFeatureSelector<
    fromCounterReducer.CounterState
>("counter");

export const getRouterState = createFeatureSelector<
    fromRouter.RouterReducerState<RouterStateUrl>
>("routerReducer");

@Injectable()
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
