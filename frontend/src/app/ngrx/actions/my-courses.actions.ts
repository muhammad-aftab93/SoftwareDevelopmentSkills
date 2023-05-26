import { createAction, props } from "@ngrx/store";
import { Course } from "src/app/models/course";

export const enum myCoursesActionsTypes {
  GET_ONGOING = 'getOngoing',
  GET_COMPLETED= "getCompleted",
  GET_ONGOING_SUCCESS = "getOngoingSuccess",
  GET_COMPLETED_SUCCESS = "getCompletedSuccess",
  GET_FAILURE = "getFailure",
  COMPLETE = "complete",
  COMPLETE_SUCCESS = "completeSuccess",
  COMPLETE_FAILURE = "completeFailure",
  WITHDRAW = "withdraw",
  WITHDRAW_SUCCESS = "withdrawSuccess",
  WITHDRAW_FAILURE = "withdrawFailure",
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

export const complete = createAction(
  myCoursesActionsTypes.COMPLETE,
  props<{ userId: string, courseId: string }>()
);

export const completeSuccess = createAction(
  myCoursesActionsTypes.COMPLETE_SUCCESS,
  props<{ message: string }>()
);

export const completeFailure = createAction(
  myCoursesActionsTypes.COMPLETE_FAILURE,
  props<{ error: string }>()
);

export const withdraw = createAction(
  myCoursesActionsTypes.WITHDRAW,
  props<{ userId: string, courseId: string }>()
);

export const withdrawSuccess = createAction(
  myCoursesActionsTypes.WITHDRAW_SUCCESS,
  props<{ message: string }>()
);

export const withdrawFailure = createAction(
  myCoursesActionsTypes.WITHDRAW_SUCCESS,
  props<{ error: string }>()
);
