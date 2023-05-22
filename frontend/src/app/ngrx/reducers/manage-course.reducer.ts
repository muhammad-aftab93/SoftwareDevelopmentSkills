import {Action, createReducer, on} from "@ngrx/store";
import * as ManageCourseActionTypes from "../actions/manage-course.actions";
import {Course} from "../../models/course";
import {getFailure, getSuccess} from "../actions/manage-course.actions";

export interface ManageCourseState {
  courses: Course[] | null;
  message: string | null;
  error: string | null;
}

const initialState: ManageCourseState = {
  courses: null,
  message: null,
  error: null,
}

export const manageCourseReducer = createReducer(
  initialState,
  on(ManageCourseActionTypes.get, (state) => ({
    ...state,
    message: null,
    error: null,
  })),
  on(ManageCourseActionTypes.getSuccess, (state, { courses }) => ({
    ...state,
    courses,
  })),
  on(ManageCourseActionTypes.getFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ManageCourseActionTypes.add, (state) => ({
    ...state,
    message: null,
    error: null,
  })),
  on(ManageCourseActionTypes.addSuccess, (state, { message }) => ({
    ...state,
    message,
  })),
  on(ManageCourseActionTypes.addFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ManageCourseActionTypes.deleteCourse, (state) => ({
    ...state,
    message: null,
    error: null,
  })),
  on(ManageCourseActionTypes.deleteSuccess, (state, { message }) => ({
    ...state,
    message,
  })),
  on(ManageCourseActionTypes.deleteFailure, (state, { error }) => ({
    ...state,
    error,
  })),
);

export function reducer(state: ManageCourseState | undefined, action: Action): ManageCourseState {
  return manageCourseReducer(state, action);
}
