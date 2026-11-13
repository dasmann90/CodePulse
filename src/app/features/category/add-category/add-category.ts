import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  imports: [ReactiveFormsModule],
  templateUrl: './add-category.html',
  styleUrl: './add-category.css',
})
export class AddCategory {
  public categoryForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    urlHandle: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
  });

  public onSubmit(): void {
    console.log('Form submitted:', this.categoryForm.value);
  }

  get nameFormControl() {
    return this.categoryForm.controls.name;
  }

  get urlHandleFormControl() {
    return this.categoryForm.controls.urlHandle;
  }
}
