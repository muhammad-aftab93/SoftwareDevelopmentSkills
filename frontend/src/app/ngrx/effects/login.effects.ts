import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserManagementService } from '../../services/user-management.service';
import { login, loginSuccess, loginFailure } from '../actions/login.actions';

@Injectable()
export class LoginEffects {

  constructor(
    private actions$: Actions,
    private userManagementService: UserManagementService
    ) {

    }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap(({ username, password }) =>
        this.userManagementService.login(username, password).pipe(
          map((response: any) => loginSuccess({ username: response.username })),
          catchError((error) => of(loginFailure({ error: error.message })))
        )
      )
    )
  );
}
