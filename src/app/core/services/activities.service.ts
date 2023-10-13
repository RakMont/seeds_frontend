import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Table} from "../models/Table.model";
import {ActivityNewDTO} from "../models/Activity.model";

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${environment.backend}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${environment.backend}/files`);
  }

  deleteActivity(payload: any): Observable<any>{
    return this.http.post<any>(environment.backend + '/activities/deleteActivity', payload
    );
  }
  createActivity(payload): Observable<any>{
    return this.http.post<any>(environment.backend +
      '/activities/createActivity', payload);
  }

  updateActivity(payload): Observable<any>{
    return this.http.post<any>(environment.backend +
      '/activities/updateActivity', payload);
  }
  getActivityById(id: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    const p = new HttpParams().set('id', id);
    return this.http.get<any>(environment.backend +
      '/activities/getActivity', { params: p });
  }

  getAllActivities(data? : any): Observable<ActivityNewDTO[]> {
    let p = new HttpParams();
    if (data) p = p.append('contributionType', data)
    //return this.http.get<Table>(/*environment.backend + */'./assets/statics/donations.json');
    return this.http.get<ActivityNewDTO[]>(environment.backend + '/activities/getAllActivities', { params: p });
  }

}
