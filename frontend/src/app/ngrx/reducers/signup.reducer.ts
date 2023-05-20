import { Action, createReducer, on } from "@ngrx/store";
import * as signupActions from "../actions/signup.actions";

export interface SignupState {
  userId: string | null;
  error: string | null;
}

const initialState: SignupState = {
  userId: null,
  error: null,
}

export const signupReducer = createReducer(
  initialState,
  on(signupActions.signup, (state) => ({
    ...state,
    userId: null,
    error: null
  })),
  on(signupActions.signupSuccess, (state, { userId }) => ({
    ...state,
    userId,
    error: null
  })),
  on(signupActions.signupFailure, (state, { error }) => ({
    ...state,
    userId: null,
    error
  }))
);

export function reducer(state: SignupState | undefined, action: Action): SignupState {
  return signupReducer(state, action);
}
