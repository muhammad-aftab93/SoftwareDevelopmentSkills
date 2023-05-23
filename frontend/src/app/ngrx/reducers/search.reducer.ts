import { Action, createReducer, on } from "@ngrx/store";
import { Course } from "src/app/models/course";
import * as SearchActions from "../actions/search.actions";

export interface SearchState {
  courses: Course[],
  message: string,
  error: string
}

const initialState: SearchState = {
  courses: [],
  message: "",
  error: ""
};

export const searchReducer = createReducer(
  initialState,
  on(SearchActions.search, (state) => ({
    ...state,
    courses: [],
    message: '',
    error: '',
  })),
  on(SearchActions.searchSuccess, (state, { courses }) => ({
    ...state,
    courses,
  })),
  on(SearchActions.searchFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: SearchState | undefined, action: Action): SearchState {
  return searchReducer(state, action);
}
