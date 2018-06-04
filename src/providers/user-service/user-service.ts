import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs';
import {User} from "../../models/user.model";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

const url = 'users';
@Injectable()
export class UserServiceProvider {
  Owner = new BehaviorSubject(null);

  constructor(public http: HttpClient) { }

  signIn$(username: string, password: string): Observable<any> {
    console.log(url);
    return this.http.post<any>(url + '/signin', { username, password });
  }

  signUp$(userData: any) {
    console.log(userData);
    return this.http.post<any>(url + '/signup', userData);
  }
  /*******MINIM UPDATE THE USER*******/
  updateUser(user){
    return this.http.put<User>(url+'/'+user.username,user)
      }
  /***********************************/
updatePassword(message){

  const userName = message.user.username;
  return this.http.put<any>(url+'/'+userName+'/checkThePassword',message)
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
  updateProfileUser$(name: string, body: any) {
    return this.http.put<any>(url + '/' + name, body);
  }

  fileUpdate(file: File) {
    const req = new HttpRequest('POST', '/file', file, {
      reportProgress: true
    });
    return this.http.request(req);
  }

}
