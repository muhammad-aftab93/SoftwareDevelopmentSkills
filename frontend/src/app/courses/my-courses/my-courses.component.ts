import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getOngoing } from 'src/app/ngrx/actions/my-courses.actions';
import { selectOngoingCourses } from 'src/app/ngrx/selectors/my-courses.selectors';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent implements OnInit {

  ongoingCourses$ = this.store.select(selectOngoingCourses);

  constructor(
    private store: Store
  ) {
    let userId = localStorage.getItem('userId');
    if (userId) {
      this.store.dispatch(getOngoing({ userId: userId }));
      // this.store.dispatch(getCompleted({ userId: userId }));
    }
  }

  ngOnInit(): void {
  }

}
