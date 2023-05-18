import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserManagementService} from "../../services/user-management.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  errorMessage: String = '';

  constructor(
    private userManagementSevice: UserManagementService,
    private formBuilder: FormBuilder
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

    this.userManagementSevice
      .signup(signupForm.value.username, signupForm.value.password)
      .subscribe({
        next: (result) => {
          // let token = result['access_token'];
          // localStorage.setItem('user', JSON.stringify(user));
          // localStorage.setItem('token', JSON.stringify(token));
          // this.router.navigate(['dashboard/layout/main']);
          console.log(result);
        },
        error: (e) => {
          this.errorMessage = e.error['message'];
          console.log(this.errorMessage);
        }
      });
  }
}
