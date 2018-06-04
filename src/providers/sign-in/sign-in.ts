import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the SignInProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SignInProvider {

  constructor(public http: HttpClient) {
    console.log('Hello SignInProvider Provider');
  }


  signInFace(userData: any) {
    console.log(userData);
    return this.http.post<any>('users/oauth/facebook/token', userData);
  }

}
