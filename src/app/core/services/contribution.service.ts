import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Table} from "../models/Table.model";
import {Volunter} from "../models/Volunteer.model";

@Injectable({
  providedIn: 'root'
})
export class ContributionService {

  constructor(private http: HttpClient) { }

  deleteContributionRecord(payload: any): Observable<any>{
    return this.http.post<any>(environment.backend + '/seeds/contribution/deleteContributionRecord', payload
    );
  }
  saveContribution(payload): Observable<any>{
    return this.http.post<any>(environment.backend +
      '/seeds/contribution/createContributionRecord', payload);
  }

  updateContribution(payload): Observable<any>{
    return this.http.post<any>(environment.backend +
      '/seeds/contribution/updateContributionRecord', payload);
  }

  listExportRecords(data? : any): Observable<Table> {
    let p = new HttpParams();
    if (data) p = p.append('contributionType', data)
    //return this.http.get<Table>(/*environment.backend + */'./assets/statics/donations.json');
    return this.http.get<Table>(environment.backend + '/seeds/contribution/getExportRecords', { params: p });
  }

  listContributionRecords(data? : any): Observable<Table> {
    console.log('AS', data);
    //let p = new HttpParams();
    const p = new HttpParams().set('endDate', data?.endDate)
      .set('beginDate', data?.beginDate)
      .set('paymentMethod', data?.paymentMethod)
      .set('contributionType', data?.contributionType)
      .set('volunter_id', data?.volunter_id )
    //return this.http.get<Table>(/*environment.backend + */'./assets/statics/donations.json');
    return this.http.get<Table>(environment.backend + '/seeds/contribution/getAllRecords', { params: p });
  }

  getContributionRecordById(id: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    const p = new HttpParams().set('id', id);
    return this.http.get<any>(environment.backend +
      '/seeds/contribution/getContributionRecordById', { params: p });
  }
}
