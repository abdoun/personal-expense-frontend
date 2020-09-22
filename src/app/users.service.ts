import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './User';
import {SessionStorageService} from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private sessionSt:SessionStorageService) { }

  usersUrl = 'http://personal-expense.local/users/';
  userSigninUrl = 'http://personal-expense.local/users/signin';
 
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  showUser(id: number): Observable<User> {
    let username = this.sessionSt.retrieve('username');
    let password = this.sessionSt.retrieve('password');
    const url = `${this.usersUrl}${id}`;
    return this.http.post<User>(url, {username, password});
  }

  signIn(username: string, password: string) {
    return this.http.post<number>(this.userSigninUrl, {username, password});
  }
}
