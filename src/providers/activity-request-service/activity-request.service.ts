import { Injectable } from '@angular/core';
import { HttpClientModule, HttpHeaders, HttpRequest, HttpClient} from '@angular/common/http';
import 'rxjs/Rx';
import {ActivityRequest} from '../../models/activityRequest.model';
import { environment } from '../../environments/environment';

@Injectable()
export class ActivityRequestService {
  public url = environment.urlBackend;

  constructor(private http: HttpClient) {  }

  // *************METODES******************* //

  getMyPetitions(id) {
    return this.http.get<ActivityRequest[]>('activityRequest/requested/' + id).map(res => res);
  }

  getTheirPetitions(id) {
    return this.http.get<ActivityRequest[]>('activityRequest/petitions/' + id).map(res => res);
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
