import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.scss']
})
export class SearchFiltersComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: String = '';

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {

  }

  onLogin(loginForm: FormGroup) {
    if (loginForm.invalid) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    // this.store.dispatch(
    //   login({
    //     username: loginForm.value.username,
    //     password: loginForm.value.password,
    //   })
    // );


  }

}
