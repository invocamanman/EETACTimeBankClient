import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';


/*
  Generated class for the ActivityServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ActivityServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ActivityServiceProvider Provider');
  }

  /*************METODES*******************/

  newActivity(newActivity) {
    console.log(this.newActivity);
    return this.http.post<any>('activities/', newActivity).map(res => res);
  }

  updateActivity(id: string, updateActivity: any) {
    return this.http.put<any>('activities/' + id, updateActivity);
  }

  getActivityAll() {
    return this.http.get<any[]>('activities/novetats').map(res => res);
  }

  getActivity(id) {
    return this.http.get<any>('activities/' + id).map(res => res);
  }

  makeApetition(newRequest) {
    return this.http.post<any>('activityRequest/fromname/' , newRequest).map(res => res);
  }


}
