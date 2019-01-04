import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromFamilyReducers from '../reducers/family.reducer';
import * as fromFamilyReducer from '../reducers/family.reducer';

export const getFamilyState = createFeatureSelector<fromFamilyReducer.FamilyState>('family');

export const getFamilyEntities = createSelector(
    getFamilyState, fromFamilyReducers.getFamilyEntities
);

export const getFamilyMembers = createSelector(
    getFamilyEntities, (entities) => {
        return Object.keys(entities).map(id => entities[id]);
    });

export const getFamilyLoaded = createSelector(
    getFamilyState, fromFamilyReducers.getFamilyLoaded);

export const getFamilyFoundEntities = createSelector(
    getFamilyState, fromFamilyReducers.getFamilyFoundEntities
);

export const getFamilyFoundMembers = createSelector(
    getFamilyFoundEntities, (entities) => {
        return Object.keys(entities).map(id => entities[id]);
    });

export const getFamilySearchLoading = createSelector(
    getFamilyState, fromFamilyReducers.getFamilysSarchLoading);
