import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginState } from '../reducers/login.reducer';

// Get the feature state
export const selectLoginState = createFeatureSelector<LoginState>('loginState');

// Select specific properties from the feature state
export const selectIsLoggedIn = createSelector(
  selectLoginState,
  (state: LoginState) => state.isLoggedIn
);

export const selectUserId = createSelector(
  selectLoginState,
  (state: LoginState) => state.userId
);

export const selectUsername = createSelector(
  selectLoginState,
  (state: LoginState) => state.username
);

export const selectUserRole = createSelector(
  selectLoginState,
  (state: LoginState) => state.role
);

export const selectJwtToken = createSelector(
  selectLoginState,
  (state: LoginState) => state.token
);

export const selectError = createSelector(
  selectLoginState,
  (state: LoginState) => state.error
);
