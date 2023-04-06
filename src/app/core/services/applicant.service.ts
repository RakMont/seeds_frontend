import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Applicant, ProcessSeedPayload, Seed} from '../models/Seed.model';
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

  createConstantapplicant(applicant: Applicant): Observable<any>  {
    return this.http.post<any>(environment.backend + '/seeds/applicants/constant', applicant);
  }

  processSeed(payload: ProcessSeedPayload): Observable<any> {
    return this.http.post<any>(environment.backend + '/seeds/applicants/processSeed' , payload);
  }

  getSeedById(id): Observable<Seed> {
    const p = new HttpParams().set('id', id);
    return this.http.get<Seed>(environment.backend + '/seeds/applicants/getSeedById'
      , { params: p });
  }
  listRejectedAplicants(): Observable<any> {
    return this.http.get<any[]>(environment.backend + '/applicants/rejected');
  }

  aceptapplicant(applicantId: number): Observable<any> {
    return this.http.put<any>(environment.backend + '/applicants/acept/' + applicantId, applicantId);
  }

  listPendingSeeds(): Observable<Table> {
    return this.http.get<Table>(environment.backend + '/seeds/applicants/pending');
  }
  listRejectedSeeds(): Observable<Table> {
    return this.http.get<Table>(environment.backend + '/seeds/applicants/rejected');
  }

  listOficialSeeds(): Observable<Table> {
    return this.http.get<Table>(environment.backend + '/seeds/applicants/acepted');
  }
  listen(): Observable<any> {
    return this._listeners.asObservable();
  }

  // tslint:disable-next-line:typedef
  filter(filterBy: string) {
    this._listeners.next(filterBy);
  }
}
