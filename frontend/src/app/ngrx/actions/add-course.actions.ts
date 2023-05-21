import { createAction, props } from "@ngrx/store";

export enum addActionTypes {
  ADD = "add",
  ADD_SUCCESS = "addSuccess",
  ADD_FAILURE = "addFailure",
}

export const add = createAction(
  addActionTypes.ADD,
  props<{ title: string, author: string, category: string, price: string }>()
);

export const addSuccess = createAction(
  addActionTypes.ADD_SUCCESS,
  props<{ message: string }>()
);

export const addFailure = createAction(
  addActionTypes.ADD_FAILURE,
  props<{ error: string }>()
);
