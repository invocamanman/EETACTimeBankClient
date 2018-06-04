import { HttpClientModule, HttpHeaders, HttpRequest, HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import {Activity} from "../../models/activity.model";
import {ActivityRequest} from "../../models/activityRequest.model";
import { environment } from '../../environments/environment';
import {Observable} from "rxjs/Rx";

@Injectable()
export class ActivityServiceProvider {
  public url = environment.urlBackend;

  constructor(public http: HttpClient) { }

  /*************METODES*******************/

  newActivity(newActivity) {
    console.log(this.newActivity);
    return this.http.post<Activity>('activities/', newActivity).map(res => res);
  }

  updateActivity(id: string, updateActivity: any) {
    return this.http.put<any>('activities/' + id, updateActivity);
  }

  getActivityAll() {
    return this.http.get<Activity>('activities/').map(res => res);
  }

  getActivity(id) {
    return this.http.get<Activity>('activities/' + id).map(res => res);
  }

  makeApetition(newRequest) {
    return this.http.post<ActivityRequest>('activityRequest/fromname/' , newRequest).map(res => res);
  }


  filtrarpornombre$(name:string, cost:number, distance:number, latitude:number, longitude:number): Observable<Activity[]> {
    console.log(this.http.post<Activity[]>('activities/filtranombre', {name: name}))
    return this.http.post<Activity[]>('activities/filtranombre', {name: name, cost: cost, distance:distance, latitude:latitude, longitude:longitude});

  }

}
