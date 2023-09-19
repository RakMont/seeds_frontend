import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Table} from "../models/Table.model";
import {environment} from "../../../environments/environment";
import {ContributionReportFilter} from "../models/ContributionRecord.model";

@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {

  constructor(private http: HttpClient) { }
  getContributionRecordsReport(data? : ContributionReportFilter): any {
    console.log('AS', data);
    //let p = new HttpParams();
    let p = new HttpParams()
      .set('reportType', data.reportType )
      .set('seedId', data?.seedId)
    if (data?.endDate)p = p.append('endDate', data?.endDate)
    if (data?.beginDate) p = p.append('beginDate', data?.beginDate)
    if (data?.contributionType) p = p.append('contributionType', data?.contributionType)
    if (data?.paymentMethod) p = p.append('paymentMethod', data?.paymentMethod)

    //return this.http.get<Table>(/*environment.backend + */'./assets/statics/donations.json');
    return this.http.get<any>(environment.backend + '/seeds/contribution/getAllRecords/report',
      { params: p, responseType: 'blob' as 'json' });
  }

  getContributionRecordsReportPDF(data? : any): any {
    console.log('AS', data);
    //let p = new HttpParams();
    const p = new HttpParams().set('endDate', data?.endDate)
      .set('reportType', data?.reportType)
      .set('beginDate', data?.beginDate)
      .set('paymentMethod', data?.paymentMethod)
      .set('contributionType', data?.contributionType)
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    //return this.http.get<Table>(/*environment.backend + */'./assets/statics/donations.json');
    return this.http.get<any>(environment.backend + '/seeds/contribution/getAllRecords/reportPDF',
      { params: p, responseType: 'blob' as 'json' });
  }
}
