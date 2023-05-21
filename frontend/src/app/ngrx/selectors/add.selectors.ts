import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginState } from '../reducers/login.reducer';
import {AddState} from "../reducers/add.reducer";

// Get the feature state
export const selectAddState = createFeatureSelector<AddState>('addState');

// Select specific properties from the feature state
export const selectMessage = createSelector(
  selectAddState,
  (state: AddState) => state.message
);

export const selectError = createSelector(
  selectAddState,
  (state: AddState) => state.error
);
