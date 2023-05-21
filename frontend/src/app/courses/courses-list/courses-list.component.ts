import {Component, Input, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import {selectIsLoggedIn, selectUserRole} from 'src/app/ngrx/selectors/login.selectors';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  @Input() page: string = '';
  isLoggedIn$ = this.store.select(selectIsLoggedIn);
  userRole$ = this.store.select(selectUserRole);

  constructor(
    private store: Store,
    )
  {

  }

  ngOnInit(): void {

  }

  courses = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 9];

}
