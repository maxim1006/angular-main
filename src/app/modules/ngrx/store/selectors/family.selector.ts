import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromFamilyReducer from '../reducers/family.reducer';

export const getFamilyState = createFeatureSelector<fromFamilyReducer.FamilyState>('family');

export const getFamilyEntities = createSelector(
    getFamilyState, fromFamilyReducer.getFamilyEntities
);

export const getFamilyMembers = createSelector(
    getFamilyEntities, (entities) => {
        return Object.keys(entities).map(id => entities[id]);
    });

export const getFamilyLoaded = createSelector(
    getFamilyState, fromFamilyReducer.getFamilyLoaded);

export const getFamilyFoundEntities = createSelector(
    getFamilyState, fromFamilyReducer.getFamilyFoundEntities
);

export const getFamilyFoundMembers = createSelector(
    getFamilyFoundEntities, (entities) => {
        return Object.keys(entities).map(id => entities[id]);
    });

export const getFamilySearchLoading = createSelector(
    getFamilyState, fromFamilyReducer.getFamilysSarchLoading);
