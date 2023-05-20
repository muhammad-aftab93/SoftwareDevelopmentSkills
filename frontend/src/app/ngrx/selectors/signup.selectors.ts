import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SignupState } from "../reducers/signup.reducer";

// Get the feature state
export const selectSignupState = createFeatureSelector<SignupState>('signupState');

// Select specific properties from the feature state
export const selectUserId = createSelector(
  selectSignupState,
  (state: SignupState) => state.userId
);

export const selectError = createSelector(
  selectSignupState,
  (state: SignupState) => state.error
)
