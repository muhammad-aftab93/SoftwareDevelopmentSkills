import { Action, createReducer, on } from '@ngrx/store';
import * as myCoursesActions from '../actions/my-courses.actions';
import { Course } from 'src/app/models/course';

export interface MyCoursesState {
  ongoingCourses: Course[];
  completedCourses: Course[];
  error: string | null;
}

const initialState: MyCoursesState = {
  ongoingCourses: [],
  completedCourses: [],
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
  );

  export function reducer(state: MyCoursesState | undefined, action: Action): MyCoursesState {
    return myCoursesReducer(state, action);
  }
