import {HttpClient, HttpParams} from '@angular/common/http';
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

  getActiveSeeds(): Observable<BoxSeed[]>{
    //return this.http.get<BoxSeed[]>(/*environment.backend + */'./assets/statics/activeseeds.json');
    return this.http.get<BoxSeed[]>(environment.backend + '/seeds/souvenir/activeBenefitedSeeds');
  }
}
