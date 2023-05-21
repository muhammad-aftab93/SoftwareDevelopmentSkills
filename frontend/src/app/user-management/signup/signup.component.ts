import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserManagementService} from "../../services/user-management.service";
import { Store } from '@ngrx/store';
import { signup } from 'src/app/ngrx/actions/signup.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  errorMessage: String = '';

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private userManagementSevice: UserManagementService
  ) {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onSignup(signupForm: FormGroup) {
    if (signupForm.invalid) {
      this.errorMessage = "All fields are required.";
      return;
    }

    if (signupForm.value.password !== signupForm.value.confirmPassword) {
      this.errorMessage = "Confirm password doesn't match.";
      return;
    }

    this.store.dispatch(
      signup({
        username: signupForm.value.username,
        password: signupForm.value.password,
      })
    );

  }
}
