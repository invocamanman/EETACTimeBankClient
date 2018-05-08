import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const url = 'http://localhost:3000/users';
@Injectable()
export class UserServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello UserServiceProvider Provider');
  }

  signIn$(username: string, password: string): Observable<any> {
    console.log(url);
    return this.http.post<any>(url + '/signin', { username, password });

  }

  signUp$(userData: any) {
    console.log(userData);
    return this.http.post<any>(url + '/signup', userData);
  }

}
