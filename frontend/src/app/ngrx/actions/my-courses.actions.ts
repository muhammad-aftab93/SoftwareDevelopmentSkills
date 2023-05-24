import { createAction, props } from "@ngrx/store";
import { Course } from "src/app/models/course";

export const enum myCoursesActionsTypes {
  GET_ONGOING = 'getOngoing',
  GET_COMPLETED= "getCompleted",
  GET_ONGOING_SUCCESS = "getOngoingSuccess",
  GET_COMPLETED_SUCCESS = "getCompletedSuccess",
  GET_FAILURE = "getFailure",
}

export const getOngoing = createAction(
  myCoursesActionsTypes.GET_ONGOING,
  props<{ userId: string }>()
);

export const getCompleted = createAction(
  myCoursesActionsTypes.GET_ONGOING,
  props<{ userId: string }>()
);

export const getOngoingSuccess = createAction(
  myCoursesActionsTypes.GET_ONGOING_SUCCESS,
  props<{ courses: Course[] }>()
);

export const getCompletedSuccess = createAction(
  myCoursesActionsTypes.GET_COMPLETED_SUCCESS,
  props<{ courses: Course[] }>()
);

export const getFailure = createAction(
  myCoursesActionsTypes.GET_FAILURE,
  props<{ error: string }>()
);
