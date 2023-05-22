import { createAction, props } from "@ngrx/store";
import {Course} from "../../models/course";

export enum ManageCourseActionTypes {
  GET = 'get',
  GET_SUCCESS = 'getSuccess',
  GET_FAILURE = 'getFailure',
  ADD = "add",
  ADD_SUCCESS = "addSuccess",
  ADD_FAILURE = "addFailure",
  DELETE = 'delete',
  DELETE_SUCCESS = "deleteSuccess",
  DELETE_FAILURE = "deleteFailure",
}

export const get = createAction(ManageCourseActionTypes.GET);

export const add = createAction(
  ManageCourseActionTypes.ADD,
  props<{ title: string, author: string, category: string, price: string }>()
);

export const getSuccess = createAction(
  ManageCourseActionTypes.GET_SUCCESS,
  props<{ courses: Course[] }>()
);

export const getFailure = createAction(
  ManageCourseActionTypes.GET_FAILURE,
  props<{ error: string }>()
);

export const addSuccess = createAction(
  ManageCourseActionTypes.ADD_SUCCESS,
  props<{ message: string }>()
);

export const addFailure = createAction(
  ManageCourseActionTypes.ADD_FAILURE,
  props<{ error: string }>()
);

export const deleteCourse = createAction(
  ManageCourseActionTypes.DELETE,
  props<{ courseId: string }>()
);

export const deleteSuccess = createAction(
  ManageCourseActionTypes.DELETE_SUCCESS,
  props<{ message: string }>()
);

export const deleteFailure = createAction(
  ManageCourseActionTypes.DELETE_FAILURE,
  props<{ error: string }>()
);
