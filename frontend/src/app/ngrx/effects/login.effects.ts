import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserManagementService } from '../../services/user-management.service';
import { login, loginSuccess, loginFailure } from '../actions/login.actions';
import { Router } from '@angular/router';

@Injectable()
export class LoginEffects {
  constructor(
    private router: Router,
    private actions$: Actions,
    private userManagementService: UserManagementService
  ) {}

  // noinspection TypeScriptValidateTypes
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap(({ username, password }) =>
        this.userManagementService.login(username, password).pipe(
          map((response: any) => {
            this.router.navigate(['/']);
            return loginSuccess({
              username: response.user.username,
              userId: response.user._id,
              userRole: response.user.role,
              token: response.token,
            });
          }),
          catchError((error) => of(loginFailure({ error: error.error.error })))
        )
      )
    )
  );
}
