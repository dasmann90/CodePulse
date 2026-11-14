import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../core/services/category-service';
import { ICategoryCreate } from '../../../core/models/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  imports: [ReactiveFormsModule],
  templateUrl: './add-category.html',
  styleUrl: './add-category.css',
})
export class AddCategory {
  private _router = inject(Router);
  private _categoryService = inject(CategoryService);
  public categoryForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    urlHandle: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
  });

  public onSubmit(): void {
    console.log('Form submitted:', this.categoryForm.value);
    this._categoryService.addCategory(this.categoryForm.value as ICategoryCreate).subscribe({
      next: (response) => {
        this._categoryService.addCategorySignal.set('success'); // Update the signal to 'success'
        this.categoryForm.reset(); // Reset the form after successful submission
        this._router.navigate(['admin/categories']); // Navigate to the category list page
      },
      error: (error) => {
        this._categoryService.addCategorySignal.set('error'); // Update the signal to 'error'
        console.error('Error adding category:', error);
      },
    });
  }

  get nameFormControl() {
    return this.categoryForm.controls.name;
  }

  get urlHandleFormControl() {
    return this.categoryForm.controls.urlHandle;
  }
}
