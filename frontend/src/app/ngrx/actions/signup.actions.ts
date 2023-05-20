import { createAction, props } from "@ngrx/store";

export enum signupActionTypes {
  SIGNUP = "signup",
  SIGNUP_SUCCESS = "signupSuccess",
  SIGNUP_FAILURE = "signupFailure",
}

export const signup = createAction(
  signupActionTypes.SIGNUP,
  props<{ username: string, password: string }>()
);

export const signupSuccess = createAction(signupActionTypes.SIGNUP_SUCCESS,
  props<{ userId: string }>()
);

export const signupFailure = createAction(
  signupActionTypes.SIGNUP_FAILURE,
  props<{ error: string }>()
);
