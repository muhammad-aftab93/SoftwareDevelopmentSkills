import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule, Routes} from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from '@ngrx/store';
import { loginReducer } from '../ngrx/reducers/login.reducer';
import { signupReducer } from '../ngrx/reducers/signup.reducer';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from '../ngrx/effects/login.effects';
import { SignupEffects } from '../ngrx/effects/signup.effects';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

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
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatGridListModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        StoreModule.forFeature('loginState', loginReducer),
        StoreModule.forFeature('signupState', signupReducer),
        EffectsModule.forFeature([
          LoginEffects,
          SignupEffects,
        ]),
    ]
})
export class UserManagementModule { }
