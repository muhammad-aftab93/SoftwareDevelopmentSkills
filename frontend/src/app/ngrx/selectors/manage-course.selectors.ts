import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginState } from '../reducers/login.reducer';
import {ManageCourseState} from "../reducers/manage-course.reducer";

// Get the feature state
export const selectManageCourseState = createFeatureSelector<ManageCourseState>('manageCourseState');

// Select specific properties from the feature state
export const selectMessage = createSelector(
  selectManageCourseState,
  (state: ManageCourseState) => state.message
);

export const selectError = createSelector(
  selectManageCourseState,
  (state: ManageCourseState) => state.error
);

export const selectCourses = createSelector(
  selectManageCourseState,
  (state: ManageCourseState) => state.courses
);

