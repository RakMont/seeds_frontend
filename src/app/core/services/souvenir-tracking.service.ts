import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Table } from '../models/Table.model';
import {environment} from "../../../environments/environment";
import { Observable } from 'rxjs';
import {BoxSeed} from "../models/Seed.model";

@Injectable({
  providedIn: 'root'
})
export class SouvenirTrackingService {

  constructor(private http: HttpClient) { }
  formData: any;

  listBenefitedSeeds(any: any){
    const p = new HttpParams().set('status', any);
    return this.http.get<Table>(environment.backend + '/seeds/souvenir/getAllBenefitedSeeds/',
      { params: p });
  }
/*
  getSouvenirTrackingHistory(any: any){
    const p = new HttpParams().set('status', any);
    return this.http.get<Table>(environment.backend + '/seeds/souvenir/getAllBenefitedSeeds/',
      { params: p });
  }
  addBenefitedSeed(payload): Observable<any> {
    return this.http.post<any>(environment.backend + '/seeds/souvenir/createBenefitedSeed/', payload);
  }

  addSouvenirTrackinfReg(payload): Observable<any> {
    return this.http.post<any>(environment.backend + '/seeds/souvenir/createSouvenirTracking/', payload);
  }
*/
  getActiveSeeds(): Observable<BoxSeed[]>{
    //return this.http.get<BoxSeed[]>(/*environment.backend + */'./assets/statics/activeseeds.json');
    return this.http.get<BoxSeed[]>(environment.backend + '/seeds/souvenir/activeBenefitedSeeds');
  }
///////////////////////////////////////////////////////////////////////
  deleteSouvenirTracking(payload: any): Observable<any>{
    return this.http.post<any>(environment.backend + '/seeds/souvenirs/deleteSeedSouvenirTracking', payload
    );
  }
  createSeedSouvenirTracking(payload): Observable<any>{
    return this.http.post<any>(environment.backend +
      '/seeds/souvenirs/createSeedSouvenirTracking', payload);
  }

  updateSeedSouvenirTracking(payload): Observable<any>{
    return this.http.post<any>(environment.backend +
      '/seeds/souvenirs/updateSeedSouvenirTracking', payload);
  }

  getAll(data? : any): Observable<Table> {
    const p = new HttpParams().set('endDate', data?.endDate)
      .set('beginDate', data?.beginDate)
      .set('trackingStatus', data.trackingStatus)
    return this.http.get<Table>(environment.backend + '/seeds/souvenirs/getAll', { params: p });
  }

  getSeedSouvenirTracking(id: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    const p = new HttpParams().set('id', id);
    return this.http.get<any>(environment.backend +
      '/seeds/souvenirs/getSeedSouvenirTracking', { params: p });
  }
}
