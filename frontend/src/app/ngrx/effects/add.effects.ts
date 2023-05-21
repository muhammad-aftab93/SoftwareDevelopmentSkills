import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserManagementService } from "src/app/services/user-management.service";
import { signup, signupFailure, signupSuccess } from "../actions/signup.actions";
import { catchError, map, mergeMap, of  } from "rxjs";
import {DialogService} from "../../services/dialog.service";
import {add, addFailure, addSuccess} from "../actions/add-course.actions";
import {CoursesService} from "../../services/courses.service";

@Injectable()
export class AddEffects {

  constructor(
    private actions$: Actions,
    private dialogService: DialogService,
    private coursesService: CoursesService
  ) {

  }

  // noinspection TypeScriptValidateTypes
  add$ = createEffect(() =>
    this.actions$.pipe(
      ofType(add),
      mergeMap(({ title, author, category, price }) =>
        this.coursesService.add(title, author, category, price).pipe(
          map((response: any) => {
            this.dialogService.showError('Course created', 'Course created successfully.');
            // TODO
            // dispatch get course list to get latest list of courses
            return addSuccess({ message: response.message });
          }),
          catchError((error) => of(addFailure({ error: error.message })))
        )
      )
    )
  );

}
