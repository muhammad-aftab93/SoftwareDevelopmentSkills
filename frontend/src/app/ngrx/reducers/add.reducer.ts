import {Action, createReducer, on} from "@ngrx/store";
import * as addActionTypes from "../actions/add-course.actions";

export interface AddState {
  message: string | null;
  error: string | null;
}

const initialState: AddState = {
  message: null,
  error: null,
}

export const addReducer = createReducer(
  initialState,
  on(addActionTypes.add, (state) => ({
    ...state,
    message: null,
    error: null,
  })),
  on(addActionTypes.addSuccess, (state, { message }) => ({
    ...state,
    message,
  })),
  on(addActionTypes.addFailure, (state, { error }) => ({
    ...state,
    error,
  })),
);

export function reducer(state: AddState | undefined, action: Action): AddState {
  return addReducer(state, action);
}
