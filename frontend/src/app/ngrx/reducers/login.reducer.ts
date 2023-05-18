import { Action, createReducer, on } from '@ngrx/store';
import * as loginActions from '../actions/login.actions';

export interface LoginState {
  isLoggedIn: boolean;
  userId: string | null;
  username: string | null;
  role: string | null;
  token: string | null;
  error: string | null;
}

const initialState: LoginState = {
  isLoggedIn: false,
  userId: null,
  username: null,
  role: null,
  token: null,
  error: null,
}

export const loginReducer = createReducer(
  initialState,
  on(loginActions.login, (state) => ({
    ...state,
    error: null,
  })),
  on(loginActions.loginSuccess, (state, { username }) => ({
    ...state,
    isLoggedIn: true,
    username,
    error: null,
  })),
  on(loginActions.loginFailure, (state, { error }) => ({
    ...state,
    isLoggedIn: false,
    username: null,
    error,
  })),
  on(loginActions.logout, () => initialState)
  );

  export function reducer(state: LoginState | undefined, action: Action): LoginState {
    return loginReducer(state, action);
  }
