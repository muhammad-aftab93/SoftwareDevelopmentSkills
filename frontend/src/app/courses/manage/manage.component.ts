import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { get } from 'src/app/ngrx/actions/manage-course.actions';
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


}
