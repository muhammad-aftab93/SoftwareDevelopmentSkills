import { Action, createReducer, on } from '@ngrx/store';
import * as myCoursesActions from '../actions/my-courses.actions';
import { Course } from 'src/app/models/course';

export interface MyCoursesState {
  ongoingCourses: Course[];
  completedCourses: Course[];
  message: string | null;
  error: string | null;
}

const initialState: MyCoursesState = {
  ongoingCourses: [],
  completedCourses: [],
  message: null,
  error: null,
}

export const myCoursesReducer = createReducer(
  initialState,
  on(myCoursesActions.getCompleted, (state) => ({
    ...state,
    error: null,
  })),
  on(myCoursesActions.getCompletedSuccess, (state, { courses }) => ({
    ...state,
    completedCourses: courses,
    error: null,
  })),
  on(myCoursesActions.getOngoing, (state) => ({
    ...state,
    error: null,
  })),
  on(myCoursesActions.getOngoingSuccess, (state, { courses }) => ({
    ...state,
    ongoingCourses: courses,
    error: null,
  })),
  on(myCoursesActions.getFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(myCoursesActions.complete, (state, { userId, courseId }) => ({
    ...state,
    error: null,
  })),
  on(myCoursesActions.completeSuccess, (state, { message }) => ({
    ...state,
    message: message,
    error: null,
  })),
  on(myCoursesActions.completeFailure, (state, { error }) => ({
    ...state,
    message: null,
    error: error,
  })),
  on(myCoursesActions.withdraw, (state, { userId, courseId }) => ({
    ...state,
    error: null,
  })),
  on(myCoursesActions.withdrawSuccess, (state, { message }) => ({
    ...state,
    message: message,
    error: null,
  })),
  on(myCoursesActions.withdrawFailure, (state, { error }) => ({
    ...state,
    message: null,
    error: error,
  })),
  );

  export function reducer(state: MyCoursesState | undefined, action: Action): MyCoursesState {
    return myCoursesReducer(state, action);
  }
