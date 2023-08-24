import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Table} from "../models/Table.model";
import {BoxSeed} from "../models/Seed.model";
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {
  constructor(private http: HttpClient) { }

  listTrackingSeeds(idVolunteer): Observable<Table> {
    const p = new HttpParams().set('id', idVolunteer);
    //return this.http.get<Table>(/*environment.backend + */'./assets/statics/trackingseeds.json');
    return this.http.get<Table>(environment.backend + '/seeds/trackingassignment/trackingSeeds', { params: p });
  }
  getActiveSeeds(): Observable<BoxSeed[]>{
    //return this.http.get<BoxSeed[]>(/*environment.backend + */'./assets/statics/activeseeds.json');
    return this.http.get<BoxSeed[]>(environment.backend + '/seeds/applicants/activeseeds');
  }

  saveTrackingAssign(payload): Observable<any> {
    return this.http.post<any>(environment.backend + '/seeds/trackingassignment/createAssinment', payload);
  }

  listSeedTrackingRecords(idSeed): Observable<Table> {
    const p = new HttpParams().set('id', idSeed);
    //return this.http.get<Table>(/*environment.backend + */'./assets/statics/donations.json');
    return this.http.get<Table>(environment.backend + '/seeds/contribution/getRecords', { params: p });
  }

  getIncomeContributions(beginDate?): Observable<Table> {
    const p = new HttpParams().set('id', beginDate);
    return this.http.get<Table>(environment.backend +
      '/seeds/trackingassignment/trackingSeeds'
      , { params: p });
  }

//////////////////////////////

  /*listExportRecords(data? : any): Observable<Table> {
    let p = new HttpParams();
    if (data) p = p.append('contributionType', data)
    return this.http.get<Table>(environment.backend + '/seeds/contribution/getExportRecords', { params: p });
  }

  getSeedsDonations(idSeed): Observable<Table> {
      const p = new HttpParams().set('id', idSeed);
      return this.http.get<Table>(environment.backend +
        '/seeds/tracking/trackingSeeds'
        , { params: p });
  }

  saveContribution(payload){
    return this.http.post<any>(environment.backend +
      '/seeds/contribution/createContributionRecord', payload);
  }*/


}
