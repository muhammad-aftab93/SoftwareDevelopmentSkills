import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserManagementService } from "src/app/services/user-management.service";
import { signup, signupFailure, signupSuccess } from "../actions/signup.actions";
import { catchError, map, mergeMap, of  } from "rxjs";
import {DialogService} from "../../services/dialog.service";

@Injectable()
export class SignupEffects {

  constructor(
    private actions$: Actions,
    private dialogService: DialogService,
    private userManagementService: UserManagementService
  ) {

  }

  // noinspection TypeScriptValidateTypes
  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signup),
      mergeMap(({ username, password }) =>
        this.userManagementService.signup(username, password).pipe(
          map((response: any) => {
            this.dialogService.showError('User created', 'User created successfully.');
            return signupSuccess({ userId: response.user._id });
          }),
          catchError((error) => of(signupFailure({ error: error.message })))
        )
      )
    )
  );

}
