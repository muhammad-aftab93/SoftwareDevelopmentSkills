import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of  } from "rxjs";
import {DialogService} from "../../services/dialog.service";
import {add, addFailure, addSuccess, deleteCourse, deleteFailure, deleteSuccess, get, getFailure, getSuccess} from "../actions/manage-course.actions";
import {CoursesService} from "../../services/courses.service";
import { Course } from "src/app/models/course";
import { Store } from "@ngrx/store";

@Injectable()
export class ManageCourseEffects {

  constructor(
    private actions$: Actions,
    private dialogService: DialogService,
    private coursesService: CoursesService,
    private store: Store
  ) {

  }

  // noinspection TypeScriptValidateTypes
  get$ = createEffect(() =>
    this.actions$.pipe(
      ofType(get),
      mergeMap(({ }) =>
        this.coursesService.get().pipe(
          map((response: any) => {
            return getSuccess({ courses: response.courses as Course[] });
          }),
          catchError((error) => of(addFailure({ error: error.message })))
        )
      )
    )
  );

  // noinspection TypeScriptValidateTypes
  add$ = createEffect(() =>
    this.actions$.pipe(
      ofType(add),
      mergeMap(({ title, author, category, price }) =>
        this.coursesService.add(title, author, category, price).pipe(
          map((response: any) => {
            this.dialogService.showDialog('Course created', 'Course created successfully.');
            this.store.dispatch(get());
            return addSuccess({ message: response.message });
          }),
          catchError((error) => of(getFailure({ error: error.message })))
        )
      )
    )
  );

  // noinspection TypeScriptValidateTypes
  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCourse),
      mergeMap(({ courseId }) =>
        this.coursesService.delete(courseId).pipe(
          map((response: any) => {
            this.dialogService.showDialog('Course deleted', 'Course deleted successfully.');
            this.store.dispatch(get());
            return deleteSuccess({ message: response.message });
          }),
          catchError((error) => of(deleteFailure({ error: error.message })))
        )
      )
    )
  );

}
