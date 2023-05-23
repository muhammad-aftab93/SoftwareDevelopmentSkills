import { createAction, props } from "@ngrx/store";
import { Course } from "src/app/models/course";

export enum searchActionTypes {
  SEARCH = "search",
  SEARCH_SUCCESS = "searchSuccess",
  SEARCH_FAILURE = "searchFailure",
};

export const search = createAction(
  searchActionTypes.SEARCH,
  props<{ title: string, author: string, category: string }>()
);

export const searchSuccess = createAction(
  searchActionTypes.SEARCH_SUCCESS,
  props<{ courses: Course[] }>()
);

export const searchFailure = createAction(
  searchActionTypes.SEARCH_FAILURE,
  props<{ error: string }>()
);
