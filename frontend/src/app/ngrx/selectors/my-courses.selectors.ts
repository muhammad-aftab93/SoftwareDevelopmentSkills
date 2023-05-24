import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MyCoursesState } from '../reducers/my-courses.reducer';

// Get the feature state
export const selectMyCoursesState = createFeatureSelector<MyCoursesState>('myCoursesState');

// Select specific properties from the feature state
export const selectOngoingCourses = createSelector(
  selectMyCoursesState,
  (state: MyCoursesState) => state.ongoingCourses
);

export const selectCompletedCourses = createSelector(
  selectMyCoursesState,
  (state: MyCoursesState) => state.completedCourses
);

export const selectMessage = createSelector(
  selectMyCoursesState,
  (state: MyCoursesState) => state.error
);

export const selectError = createSelector(
  selectMyCoursesState,
  (state: MyCoursesState) => state.error
);
