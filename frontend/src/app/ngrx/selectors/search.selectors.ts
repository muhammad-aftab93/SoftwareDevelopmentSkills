import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SearchState } from '../reducers/search.reducer';

// Get the feature state
export const selectSearchState = createFeatureSelector<SearchState>('searchState');

// Select specific properties from the feature state
export const selectCourses = createSelector(
  selectSearchState,
  (state: SearchState) => state.courses
);

export const selectMessage = createSelector(
  selectSearchState,
  (state: SearchState) => state.message
);

export const selectError = createSelector(
  selectSearchState,
  (state: SearchState) => state.error
);
