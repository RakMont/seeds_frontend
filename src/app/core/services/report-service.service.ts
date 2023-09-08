import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Table} from "../models/Table.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {

  constructor(private http: HttpClient) { }
  getContributionRecordsReport(data? : any): any {
    let p = new HttpParams();
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    if (data) p = p.append('contributionType', data)
    //return this.http.get<Table>(/*environment.backend + */'./assets/statics/donations.json');
    return this.http.get<any>(environment.backend + '/seeds/contribution/getAllRecords/report',
      { params: p, responseType: 'blob' as 'json' });
  }
}
