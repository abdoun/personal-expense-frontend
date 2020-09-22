import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from './Expense';
import { SessionStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  constructor(private http: HttpClient, private sessionSt:SessionStorageService) { }

  expensesUrl = 'http://personal-expense.local/expenses/';

  getAllExpenses(): Observable<Expense[]> {
    const  username = this.sessionSt.retrieve('username');
    const password = this.sessionSt.retrieve('password');
    const userId = this.sessionSt.retrieve('userId');
    const url = `${this.expensesUrl}user/${userId}`;

    return this.http.post<Expense[]>(url, { username , password } );
  }

  getAllExpensesCount(): Observable<number> {
    const  username = this.sessionSt.retrieve('username');
    const password = this.sessionSt.retrieve('password');
    const userId = this.sessionSt.retrieve('userId');
    const url = `${this.expensesUrl}user/${userId}/count`;

    return this.http.post<number>(url, { username , password } );
  }

  getAllExpensesByCategoryCount(id: number): Observable<number> {
    const  username = this.sessionSt.retrieve('username');
    const password = this.sessionSt.retrieve('password');
    const url = `${this.expensesUrl}category/${id}/count`;

    return this.http.post<number>(url, { username , password } );
  }

  getExpensesByCategoryId(id: number): Observable<Expense[]> {
    const url = `${this.expensesUrl}category/${id}`;
    const  username = this.sessionSt.retrieve('username');
    const password = this.sessionSt.retrieve('password');

    return this.http.post<Expense[]>(url, {username, password});
  }

  showExpense(id: number): Observable<Expense> {
    const url = `${this.expensesUrl}${id}`;
    const username = this.sessionSt.retrieve('username');
    const password = this.sessionSt.retrieve('password');

    return this.http.post<Expense>(url, {username, password});
  }

  updateExpense(id: number, qty: number, category: number, date_time: Date, notes: string) {
    const url = `${this.expensesUrl}update/${id}`;
    const username = this.sessionSt.retrieve('username');
    const password = this.sessionSt.retrieve('password');

    return this.http.patch<number>(url,{username, password, qty, category, date_time, notes});
  }

  addExpense(qty: number, category: number, date_time: Date, notes: string) {
    const url = `${this.expensesUrl}add`;
    const username = this.sessionSt.retrieve('username');
    const password = this.sessionSt.retrieve('password');
    
    return this.http.post<number>(url,{username, password, qty, category, date_time, notes});

  }

  deleteExpense(id: number): Observable<string> {
    const url = `${this.expensesUrl}delete/${id}`;
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
