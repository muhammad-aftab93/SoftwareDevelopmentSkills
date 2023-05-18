import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserManagementService} from "../../services/user-management.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: String = '';

  constructor(
    private userManagementService: UserManagementService,
    private formBuilder: FormBuilder,
    private router: Router
  ){
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {

  }

  onLogin(loginForm: FormGroup) {

    if (loginForm.invalid) {
      this.errorMessage = "All fields are required.";
      return;
    }

    this.userManagementService
      .login(loginForm.value.username, loginForm.value.password)
      .subscribe({
        next: (result) => {
          // let token = result['access_token'];
          // localStorage.setItem('user', JSON.stringify(user));
          // localStorage.setItem('token', JSON.stringify(token));
          // this.router.navigate(['dashboard/layout/main']);
          alert(result);
        },
        error: (e) => {
          this.errorMessage = e.error['message'];
          alert(this.errorMessage);
        }
      });
  }
}
