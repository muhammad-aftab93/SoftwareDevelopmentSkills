import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { search, searchFailure, searchSuccess } from '../actions/search.actions';

@Injectable()
export class SearchEffects {
  constructor(
    private router: Router,
    private actions$: Actions,
    private coursesService: CoursesService
  ) {}

  // noinspection TypeScriptValidateTypes
  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(search),
      mergeMap(({ title, author, category }) =>
        this.coursesService.search(title, author, category).pipe(
          map((response: any) => {
            return searchSuccess({
              courses: response.courses,
            });
          }),
          catchError((error) => of(searchFailure({ error: error.error.error })))
        )
      )
    )
  );
}
