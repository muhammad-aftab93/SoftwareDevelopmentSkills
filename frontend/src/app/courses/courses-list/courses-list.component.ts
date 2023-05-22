import {Component, Input, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Course } from 'src/app/models/course';
import { deleteCourse, get } from 'src/app/ngrx/actions/manage-course.actions';
import {selectIsLoggedIn, selectUserRole} from 'src/app/ngrx/selectors/login.selectors';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  @Input() page: string = '';
  @Input() courses: Course[] | null = [];
  isLoggedIn$ = this.store.select(selectIsLoggedIn);
  userRole$ = this.store.select(selectUserRole);

  constructor(
    private store: Store,
    )
  {
  }

  ngOnInit(): void {

  }

  onDeleteCourse(id: string): void {
    if(confirm('Are you sure you want to delete this course?')) {
      this.store.dispatch(deleteCourse({ courseId: id }));
      this.store.dispatch(get());
    }
  }



}
