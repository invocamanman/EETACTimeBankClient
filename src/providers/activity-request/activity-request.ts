import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ActivityRequestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ActivityRequestProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ActivityRequestProvider Provider');
  }

  getMyPetitions(id) {
    return this.http.get('activityRequest/requested/' + id).map(res => res);
  }

  getTheirPetitions(id) {
    return this.http.get('activityRequest/petitions/' + id).map(res => res);
  }
  getCounters(id) {
    return this.http.get('activityRequest/count/' + id).map(res => res);
  }

  deletePetition(idPetition) {
    return this.http.delete('activityRequest/' + idPetition).map (res => res);
  }

  acceptPetition(idPetition) {
    return this.http.put('activityRequest/accept/', {'id': idPetition}).map(res => res);
  }

  donePetition(idPetition, rate) {
    return this.http.put('activityRequest/done/', {'id': idPetition, 'rate': rate}).map(res => res);
  }

}
