import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule, Routes} from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];
@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatCardModule,
        MatButtonModule,
        MatGridListModule,
        MatInputModule,
        ReactiveFormsModule
    ]
})
export class UserManagementModule { }
