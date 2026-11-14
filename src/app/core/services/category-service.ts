import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, InputSignal, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory, ICategoryCreate, ICategoryUpadte } from '../models/category.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private _http = inject(HttpClient);
  private _baseUrl = environment.baseUrl;
  public addCategorySignal = signal<'ideal' | 'loading' | 'success' | 'error'>('ideal');

  public addCategory(data: ICategoryCreate): Observable<any> {
    return this._http.post(`${this._baseUrl}/categories`, data);
  }

  public getAllCategories(): Observable<any> {
    return this._http.get(`${this._baseUrl}/categories`);
  }

  public getCategory() {
    return httpResource<ICategory[]>(() => `${this._baseUrl}/categories`);
  }

  public getCategoryById(id: InputSignal<string | undefined>) {
    return httpResource<ICategory>(() => `${this._baseUrl}/categories/${id()}`);
  }

  public updateCategory(id: string, data: ICategoryUpadte): Observable<any> {
    return this._http.put(`${this._baseUrl}/categories/${id}`, data);
  }

  public deleteCategory(id: string): Observable<any> {
    return this._http.delete(`${this._baseUrl}/categories/${id}`);
  }
}
