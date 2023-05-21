import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.scss']
})
export class SearchFiltersComponent implements OnInit {
  filterForm: FormGroup;
  errorMessage: String = '';

  categoryOptions = ["", "Web Development", "Mobile Development", "Frontend", "Backend", "Full-stack"];

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
  ) {
    this.filterForm = this.formBuilder.group({
      title: [''],
      author: [''],
      category: ['']
    });
  }

  ngOnInit(): void {

  }

  onSearch(filterForm: FormGroup) {
    // if (filterForm.invalid) {
    //   this.errorMessage = 'All fields are required.';
    //   return;
    // }

    // this.store.dispatch(
    //   login({
    //     username: loginForm.value.username,
    //     password: loginForm.value.password,
    //   })
    // );


  }

}
