import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { ManageComponent } from './manage/manage.component';
import { RouterModule, Routes, provideRouter} from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { loginReducer } from '../ngrx/reducers/login.reducer';
import { SearchFiltersComponent } from './search-filters/search-filters.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { AddCourseComponent } from './add-course/add-course.component';
import { authGuard } from '../guards/auth.guard';
import { roleGuard } from "../guards/role.guard";
import {MatTabsModule} from "@angular/material/tabs";
import {manageCourseReducer} from "../ngrx/reducers/manage-course.reducer";
import {EffectsModule} from "@ngrx/effects";
import {LoginEffects} from "../ngrx/effects/login.effects";
import {SignupEffects} from "../ngrx/effects/signup.effects";
import {ManageCourseEffects} from "../ngrx/effects/manage-course.effects";

const routes: Routes = [
  {
    path: '',
    redirectTo: "search",
    pathMatch: "full"
  },
  {
    path: "search",
    component: SearchComponent,
  },
  {
    path: 'my-courses',
    component: MyCoursesComponent,
    canActivate: [authGuard]
  },
  {
    path: 'manage',
    component: ManageComponent,
    canActivate: [authGuard, roleGuard],
    data: {
      expectedRole: 'admin'
    }
  }
];

@NgModule({
  declarations: [
    SearchComponent,
    ManageComponent,
    MyCoursesComponent,
    AddCourseComponent,
    CoursesListComponent,
    SearchFiltersComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatGridListModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    StoreModule.forFeature('loginState', loginReducer),
    StoreModule.forFeature('manageCourseState', manageCourseReducer),
    EffectsModule.forFeature([
      ManageCourseEffects,
    ]),
  ],
  providers: [
    Store,
    provideRouter(routes)
  ],
  exports: [RouterModule]
})
export class CoursesModule { }
