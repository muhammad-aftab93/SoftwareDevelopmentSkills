import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { complete, completeFailure, completeSuccess, getCompleted, getCompletedSuccess, getFailure, getOngoing, getOngoingSuccess, withdraw, withdrawFailure, withdrawSuccess } from '../actions/my-courses.actions';
import { DialogService } from 'src/app/services/dialog.service';
import { Store } from '@ngrx/store';

@Injectable()
export class MyCoursesEffects {
  constructor(
    private router: Router,
    private actions$: Actions,
    private store: Store,
    private dialogService: DialogService,
    private coursesService: CoursesService,
  ) {}

  // noinspection TypeScriptValidateTypes
  getOnGoing$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getOngoing),
      mergeMap(({ userId }) =>
        this.coursesService.getOnGoing(userId).pipe(
          map((response: any) => {
            return getOngoingSuccess({
              courses: response.courses,
            });
          }),
          catchError((error) => of(getFailure({ error: error.error.error })))
        )
      )
    )
  );

  // noinspection TypeScriptValidateTypes
  getCompleted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCompleted),
      mergeMap(({ userId }) =>
        this.coursesService.getCompleted(userId).pipe(
          map((response: any) => {
            return getCompletedSuccess({
              courses: response.courses,
            });
          }),
          catchError((error) => of(getFailure({ error: error.error.error })))
        )
      )
    )
  );

  // noinspection TypeScriptValidateTypes
  complete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(complete),
      mergeMap(({ userId, courseId }) =>
        this.coursesService.markAsComplete(userId, courseId).pipe(
          map((response: any) => {
            this.store.dispatch(getCompleted({userId}));
            this.dialogService.showDialog('Completed successfully', response.message)
            return completeSuccess({
              message: response.message,
            });
          }),
          catchError((error) => of(completeFailure({ error: error.error.error })))
        )
      )
    )
  );

  // noinspection TypeScriptValidateTypes
  withdraw$ = createEffect(() =>
    this.actions$.pipe(
      ofType(withdraw),
      mergeMap(({ userId, courseId }) =>
        this.coursesService.withdraw(userId, courseId).pipe(
          map((response: any) => {
            this.store.dispatch(getCompleted({userId}));
            this.dialogService.showDialog('Withdraw successful', response.message)
            return withdrawSuccess({
              message: response.courses,
            });
          }),
          catchError((error) => of(withdrawFailure({ error: error.error.error })))
        )
      )
    )
  );

}
