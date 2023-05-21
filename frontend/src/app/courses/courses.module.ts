import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { ManageComponent } from './manage/manage.component';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
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
  },
  {
    path: 'manage',
    component: ManageComponent,
  }
];

@NgModule({
  declarations: [
    SearchComponent,
    ManageComponent,
    MyCoursesComponent,
    CoursesListComponent,
    SearchFiltersComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('loginState', loginReducer),
  ]
})
export class CoursesModule { }
