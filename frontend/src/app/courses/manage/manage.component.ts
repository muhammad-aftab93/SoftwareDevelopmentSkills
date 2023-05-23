import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { deleteCourse, get } from 'src/app/ngrx/actions/manage-course.actions';
import { selectCourses } from 'src/app/ngrx/selectors/manage-course.selectors';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  courses$ = this.store.select(selectCourses);

  constructor(
    private store: Store
  ) {
    this.store.dispatch(get());
  }

  ngOnInit(): void {
  }

  onDelete(id: string): void {
    if(confirm('Are you sure you want to delete this course?')) {
      this.store.dispatch(deleteCourse({ courseId: id }));
      this.store.dispatch(get());
    }
  }

}
