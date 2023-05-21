import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {add} from "../../ngrx/actions/add-course.actions";

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent {
  addForm: FormGroup;
  errorMessage: String = '';

  categoryOptions = ["", "Web Development", "Mobile Development", "Frontend", "Backend", "Full-stack"];

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
  ) {
    this.addForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  ngOnInit(): void {

  }

  onAdd(addForm: FormGroup) {
    if (addForm.invalid) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    this.store.dispatch(
      add({
        title: addForm.value.title,
        author: addForm.value.author,
        category: addForm.value.category,
        price: addForm.value.price,
      })
    );

    this.addForm.reset();
  }

}
