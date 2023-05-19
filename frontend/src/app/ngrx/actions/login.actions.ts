import  { createAction, props } from '@ngrx/store';

export enum loginActionTypes {
  LOGIN = "login",
  LOGIN_SUCCESS = "loginSuccess",
  LOGIN_FAILURE = "loginFailure",
}

export const login = createAction(
  loginActionTypes.LOGIN,
  props<{ username: string, password: string}>()
);

export const loginSuccess = createAction(
  loginActionTypes.LOGIN_SUCCESS,
  props<{ userId: string, username: string, userRole: string, token: string }>()
);

export const loginFailure = createAction(
  loginActionTypes.LOGIN_FAILURE,
  props<{ error: string }>()
);

export const logout = createAction('logout');
