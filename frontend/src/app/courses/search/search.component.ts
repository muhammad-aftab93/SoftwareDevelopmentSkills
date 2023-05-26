import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError } from 'rxjs';
import { selectCourses } from 'src/app/ngrx/selectors/search.selectors';
import { CoursesService } from 'src/app/services/courses.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  courses$ = this.store.select(selectCourses);

  constructor(
    private store: Store,
    private coursesService: CoursesService,
    private dialogService: DialogService
  ) {
  }

  ngOnInit(): void {
  }

  onEnroll(courseId: string): void {
    if(confirm('Are you sure you want to enroll this course?')) {
      let userId = localStorage.getItem('userId');
      if(userId) {
        this.coursesService.enroll(userId, courseId)
          .subscribe({
            next: (result: any) => {
              this.dialogService.showDialog('Course enrolled', 'Course enrolled successfully!');
            },
            error: (err: any) => catchError(err),
            complete: () => {},
          });
      }
    }
  }

}
