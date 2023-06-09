import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { login} from '../../ngrx/actions/login.actions';
import { Store } from '@ngrx/store';
import { selectError, selectIsLoggedIn, selectUsername} from '../../ngrx/selectors/login.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: String = '';

  isLoggedIn$ = this.store.select(selectIsLoggedIn);
  username$ = this.store.select(selectUsername);
  error$ = this.store.select(selectError);

  constructor(
    private formBuilder: FormBuilder,
    private store: Store
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onLogin(loginForm: FormGroup) {
    if (loginForm.invalid) {
      throw new Error('All fields are required.');
      return;
    }

    this.store.dispatch(
      login({
        username: loginForm.value.username,
        password: loginForm.value.password,
      })
    );
  }
}
