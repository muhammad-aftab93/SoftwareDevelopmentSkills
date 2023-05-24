import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Store } from '@ngrx/store';
import { Course } from 'src/app/models/course';
import {selectIsLoggedIn, selectUserRole} from 'src/app/ngrx/selectors/login.selectors';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  @Input() page: string = '';
  @Input() courses: Course[] | null = [];
  @Output() onDelete: EventEmitter<string> = new EventEmitter<string>();
  @Output() onEnroll: EventEmitter<string> = new EventEmitter<string>();
  @Output() onComplete: EventEmitter<string> = new EventEmitter<string>();
  @Output() onWithDraw: EventEmitter<string> = new EventEmitter<string>();
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
    this.onDelete.emit(id);
  }

  onEnrollCourse(id: string): void {
    this.onEnroll.emit(id);
  }

  onCompleteCourse(id: string): void {
    this.onComplete.emit(id);
  }

  onWithDrawCourse(id: string): void {
    this.onWithDraw.emit(id);
  }

}
