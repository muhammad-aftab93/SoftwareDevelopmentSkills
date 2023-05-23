import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCourses } from 'src/app/ngrx/selectors/search.selectors';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  courses$ = this.store.select(selectCourses);

  constructor(
    private store: Store
  ) {
  }

  ngOnInit(): void {
  }

}
