import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Store } from '@ngrx/store';
import { search } from 'src/app/ngrx/actions/search.actions';

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
    this.store.dispatch(search({title: '', author: '', category: ''}));
  }

  ngOnInit(): void {
  }

  onSearch(filterForm: FormGroup) {
    this.store.dispatch(
      search({
        title: filterForm.value.title,
        author: filterForm.value.author,
        category: filterForm.value.category,
      })
    );
  }

}
