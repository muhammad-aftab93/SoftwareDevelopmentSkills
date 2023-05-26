import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { complete, getOngoing, withdraw } from 'src/app/ngrx/actions/my-courses.actions';
import { selectCompletedCourses, selectOngoingCourses } from 'src/app/ngrx/selectors/my-courses.selectors';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent implements OnInit {

  ongoingCourses$ = this.store.select(selectOngoingCourses);
  completedCourses$ = this.store.select(selectCompletedCourses);

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

  onComplete(courseId: string) : void {
    var userId = localStorage.getItem('userId');
    if(confirm('Are you sure you want to mark this course as completed?') && userId)
      this.store.dispatch(complete({ userId: userId, courseId: courseId }));
  }

  onWithDraw(courseId: string) : void {
    var userId = localStorage.getItem('userId');
    if(confirm('Are you sure you want to withdraw this course?') && userId)
      this.store.dispatch(withdraw({ userId: userId, courseId: courseId }));
  }

}
