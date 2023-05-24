import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { getCompleted, getCompletedSuccess, getFailure, getOngoing, getOngoingSuccess } from '../actions/my-courses.actions';

@Injectable()
export class MyCoursesEffects {
  constructor(
    private router: Router,
    private actions$: Actions,
    private coursesService: CoursesService
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

}
