import { Component, effect, inject, input } from '@angular/core';
import { CategoryService } from '../../../core/services/category-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ICategoryUpadte } from '../../../core/models/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-category.html',
  styleUrl: './edit-category.css',
})
export class EditCategory {
  public id = input<string>();
  private _categoryService = inject(CategoryService);
  private _router = inject(Router);

  public categoryDataRef = this._categoryService.getCategoryById(this.id);
  public isLoading = this.categoryDataRef.isLoading;
  public isError = this.categoryDataRef.error;
  public data = this.categoryDataRef.value;

  public categoryForm = new FormGroup({
    name: new FormControl<string>(this.data?.name || '', [
      Validators.required,
      Validators.minLength(3),
    ]),
    urlHandle: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
  });

  get nameFormControl() {
    return this.categoryForm.controls.name;
  }

  get urlHandleFormControl() {
    return this.categoryForm.controls.urlHandle;
  }

  public onSubmit(): void {
    console.log('Form submitted:', this.categoryForm.value);
    const id = this.id();
    if (!id || this.categoryForm.invalid) {
      console.error('Invalid form submission or missing category ID');
      return;
    }
    // Implement the logic to update the category using the CategoryService
    this._categoryService.updateCategory(id, this.categoryForm.value as ICategoryUpadte).subscribe({
      next: (response) => {
        console.log('Category updated successfully:', response);
        this._router.navigate(['admin/categories']); // Navigate to the categories list or any other page after successful update
      },
      error: (error) => {
        console.error('Error updating category:', error);
      },
    });
  }

  public effectRef = effect(() => {
    this.categoryForm.patchValue({
      name: this.data()?.name || '',
      urlHandle: this.data()?.urlHandle || '',
    });
  });
}
