import { HttpClient, HttpHeaders, HttpRequest, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs';
import {User} from "../../models/user.model";
import {Activity} from "../../models/activity.model";

const url = 'users';
@Injectable()
export class UserServiceProvider {

  constructor(public http: HttpClient) { }

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

  addchat$(json: any) {
    return this.http.post<any>(url + 'chats/add', json);
  }

  fileUpdate(file: File) {
    const req = new HttpRequest('POST', '/file', file, {
      reportProgress: true
    });
    return this.http.request(req);
  }

  getFavorites(user: string) {
    return this.http.get<Activity[]>(url + '/favorites/' + user);
  }

  updateFavorites(user: string, list: Activity[]) {
    const json = { favorites: list };
    return this.http.put<any>(url + '/favorites/' + user, json);
  }

}
