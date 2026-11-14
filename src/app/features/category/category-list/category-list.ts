import { Component, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../../core/services/category-service';
import { ICategory } from '../../../core/models/category.model';

@Component({
  selector: 'app-category-list',
  imports: [RouterLink],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css',
})
export class CategoryList {
  private _categoryService = inject(CategoryService);
  private _categoryResource = this._categoryService.getCategory();

  public isLoading = this._categoryResource.isLoading;
  public isError = this._categoryResource.error;
  public data = this._categoryResource.value;

  public deleteCategory(id: string) {
    const confirmation = window.confirm('Are you sure you want to delete this category?');
    if (!confirmation) {
      return;
    }
    this._categoryService.deleteCategory(id).subscribe({
      next: () => {
        // Remove the deleted category from the local categories array
        this.data?.update((currentData) =>
          currentData?.filter((category) => category.id.toString() !== id),
        );
      },
      error: (err) => {
        console.error('Error deleting category:', err);
      },
    });
  }
}
