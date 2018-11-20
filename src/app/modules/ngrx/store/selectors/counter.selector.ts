import {createSelector} from "@ngrx/store";
import * as fromFeature from "../reducers";
import * as fromCounterReducers from "../reducers/counter.reducer";
import * as fromRoot from '../reducers';

export const getCurrentCounter = createSelector(
    fromFeature.getCounterState,
    fromCounterReducers.getCurrentCounter
);

export const getCurrentCounterRouteState = createSelector(
    getCurrentCounter,
    fromRoot.getRouterState,
    (number, router) => {
        return number + " " + router.state.url;
    }
);
