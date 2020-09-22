import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from './Category';
import { SessionStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient, private sessionSt:SessionStorageService) {  }

  categoreisUrl = 'http://personal-expense.local/categories/';
  

  getCategories(): Observable<Category[]> {
    const  username = this.sessionSt.retrieve('username');
    const password = this.sessionSt.retrieve('password');

    return this.http.post<Category[]>(this.categoreisUrl, { username , password } );
  }

  showCategory(id: number): Observable<Category> {
    const url = `${this.categoreisUrl}${id}`;
    const username = this.sessionSt.retrieve('username');
    const password = this.sessionSt.retrieve('password');

    return this.http.post<Category>(url, {username, password});
  }

  updateCategory(id: number, name: string, notes: string) {
    const url = `${this.categoreisUrl}update/${id}`;
    const username = this.sessionSt.retrieve('username');
    const password = this.sessionSt.retrieve('password');
    return this.http.patch<number>(url,{username, password, name, notes});

  }

  addCategory(name: string, notes: string) {
    const url = `${this.categoreisUrl}add`;
    const username = this.sessionSt.retrieve('username');
    const password = this.sessionSt.retrieve('password');
    
    return this.http.post<number>(url,{username, password, name, notes});

  }

  deleteCategory(id: number): Observable<string> {
    const url = `${this.categoreisUrl}delete/${id}`;
    const username = this.sessionSt.retrieve('username');
    const password = this.sessionSt.retrieve('password');
    return this.http.delete<string>(url,{
      headers: {},
      params: {
          'username': username,
          'password': password
      }
  });
  }
}
