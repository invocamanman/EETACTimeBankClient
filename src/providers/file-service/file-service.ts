import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent, HttpEventType } from '@angular/common/http';


/*
  Generated class for the FileServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FileServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello FileServiceProvider Provider');

  }
  fileUpdate(file: File) {
    const formdata: FormData = new FormData();
    console.log(file);
    formdata.append('file', file);
    const httpOptions = {
      /*headers: new HttpHeaders({
        'Content-Type':  'multipart/form-data',
        'Accept': 'application/json',
        'Authorization': localStorage['token']
      }),*/
      reportProgress: true
    };
    const req = new HttpRequest('POST', 'files', formdata, httpOptions);
    return this.http.request(req);
  }
}
