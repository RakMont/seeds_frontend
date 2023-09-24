import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Applicant, ProcessSeedPayload, Seed, SeedData, SeedFilter} from '../models/Seed.model';
import {PostMessage} from "../models/Message.model";
import {Table} from "../models/Table.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {
  constructor(private http: HttpClient) { }
  formData: any;
  // tslint:disable-next-line:variable-name
  private _listeners = new Subject<any>();
  createUniqueApplicant(applicant: Applicant): Observable<PostMessage> {
    return this.http.post<PostMessage>(environment.backend + '/seeds/applicants/unique', applicant
    );
  }

  createEnterpriseApplicant(applicant: Applicant): Observable<PostMessage> {
    return this.http.post<PostMessage>(environment.backend + '/seeds/applicants/enterprise', applicant
    );
  }

  createConstantApplicant(applicant: Applicant): Observable<any>  {
    return this.http.post<any>(environment.backend + '/seeds/applicants/constant', applicant);
  }

  processSeed(payload: ProcessSeedPayload): Observable<any> {
    return this.http.post<any>(environment.backend + '/seeds/applicants/processSeed' , payload);
  }

  getSeedById(id): Observable<SeedData> {
    const p = new HttpParams().set('id', id);
    return this.http.get<SeedData>(environment.backend + '/seeds/applicants/getSeedById'
      , { params: p });
  }
  listRejectedApplicants(): Observable<any> {
    return this.http.get<any[]>(environment.backend + '/applicants/rejected');
  }

 /* acceptApplicant(applicantId: number): Observable<any> {
    return this.http.put<any>(environment.backend + '/applicants/acept/' + applicantId, applicantId);
  }*/

  listPendingSeeds(): Observable<Table> {
    return this.http.get<Table>(environment.backend + '/seeds/applicants/pending');
  }
  listRejectedSeeds(): Observable<Table> {
    return this.http.get<Table>(environment.backend + '/seeds/applicants/rejected');
  }

  listConfirmedSeeds(filter:SeedFilter): Observable<Table> {
    const p = new HttpParams().set('status', filter.status)
      .set('viewPage', filter.viewPage)
      //.set('contributionType', filter.contributionType? filter.contributionType : null)
      .set('seedName', filter.seedName? filter.seedName : null)
      .set('applicantName', filter.applicantName? filter.applicantName : null);
    return this.http.get<Table>(environment.backend + '/seeds/applicants/processed',{ params: p });
  }

  listSeedsAll(filter:SeedFilter): Observable<Table> {
    const p = new HttpParams().set('status', filter.status)
      .set('viewPage', filter.viewPage)
      //.set('contributionType', filter.contributionType? filter.contributionType : null)
      .set('seedName', filter.seedName? filter.seedName : null)
      .set('applicantName', filter.applicantName? filter.applicantName : null);
    return this.http.get<Table>(environment.backend + '/seeds/applicants/all/', { params: p });
  }

  updateUniqueApplicant(applicant: Applicant): Observable<PostMessage> {
    return this.http.post<PostMessage>(environment.backend + '/seeds/confirmed/updateUnique', applicant
    );
  }

  updateConstantApplicant(applicant: Applicant): Observable<any>  {
    return this.http.post<any>(environment.backend + '/seeds/confirmed/updateConstant', applicant);
  }

  deactivateSeed(payload): Observable<any>  {
    return this.http.post<any>(environment.backend + '/seeds/applicants/deactivateContributor', payload);
  }

  listen(): Observable<any> {
    return this._listeners.asObservable();
  }

  // tslint:disable-next-line:typedef
  filter(filterBy: string) {
    this._listeners.next(filterBy);
  }
}
