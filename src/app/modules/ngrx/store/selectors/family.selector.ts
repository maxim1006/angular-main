import {createSelector} from "@ngrx/store";
import * as fromFeature from "../reducers";
import * as fromFamilyReducers from "../reducers/family.reducer";
import {getFamilyState} from "../reducers/index";


export const getFamilyEntities = createSelector(
    getFamilyState, fromFamilyReducers.getFamilyEntities
);

export const getFamilyMembers = createSelector(
    getFamilyEntities, (entities) => {
        return Object.keys(entities).map(id => entities[id]);
    });
