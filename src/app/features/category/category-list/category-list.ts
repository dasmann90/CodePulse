import { Component, inject } from '@angular/core';
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
  public categories: ICategory[] = [];
  private _categoryResource = this._categoryService.getCategory();

  public isLoading = this._categoryResource.isLoading;
  public isError = this._categoryResource.error;
  public data = this._categoryResource.value;
}
