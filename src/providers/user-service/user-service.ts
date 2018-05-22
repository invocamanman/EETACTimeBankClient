import { HttpClient, HttpHeaders, HttpRequest, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs';
import {User} from "../../models/user.model";

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const url = 'users';
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

  getUserWallet(id: string): Observable<any> {
    return this.http.post<any>(url + '/getUserById', { id });
  }

  getProfileUser$(name: string) {
    return this.http.get<User>(url + '/' + name);
  }

  fileUpdate(file: File) {
    const req = new HttpRequest('POST', '/file', file, {
      reportProgress: true
    });
    return this.http.request(req);
  }

}
