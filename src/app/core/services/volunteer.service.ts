import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Table} from '../models/Table.model';
import {environment} from '../../../environments/environment';
import {Volunter, VolunterFilter} from '../models/Volunteer.model';

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {
  constructor(private http: HttpClient) { }
  formData: any;
  // tslint:disable-next-line:variable-name
  private _listeners = new Subject<any>();

  listvolunters(status: string): Observable<Table> {
    const p = new HttpParams().set('status', status);
    return this.http.get<Table>(environment.backend + '/seeds/volunters/all/', { params: p });
  }

  listExitevolunters(): Observable<Table> {
    const p = new HttpParams().set('status', 'INACTIVE');
    return this.http.get<Table>(environment.backend +
      '/seeds/volunters/exitvolunters', { params: p });
  }

  listTrackingvolunters(): Observable<Table> {
    //return this.http.get<Table>('./assets/statics/trackingvolunters.json');
    return this.http.get<Table>(environment.backend + '/seeds/volunters/trackingVolunteers/');
  }
  getvolunter(volunterId: any): Observable<Volunter> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    const p = new HttpParams().set('id', volunterId);
    return this.http.get<Volunter>(environment.backend +
      '/seeds/volunters/getVolunter', { params: p });
  }

  addvolunter(volunter: Volunter): Observable<any> {
    return this.http.post<any>(environment.backend + '/seeds/volunters/create/', volunter);
  }

  updatevolunter(volunter: Volunter): Observable<any> {
    return this.http.put<any>(environment.backend + '/seeds/volunters/updateVolunter',  volunter);
  }

  exitvolunter(payload: any): Observable<any>{
    return this.http.post<any>(environment.backend + '/seeds/volunters/exitVolunter', payload
    );
  }
  deleteVolunter(payload: any): Observable<any>{
    return this.http.post<any>(environment.backend + '/seeds/volunters/deleteVolunter', payload
    );
  }

  listexitvolunter(filter: VolunterFilter): Observable<Volunter[]> {
    const p = new HttpParams()
      .set('status', filter.status)
      .set('roleId', filter.roleId);

    return this.http.get<Volunter[]>(environment.backend + '/seeds/volunters/exitvolunters');
  }
  listen(): Observable<any> {
    return this._listeners.asObservable();
  }

  // tslint:disable-next-line:typedef
  filter(filterBy: string) {
    this._listeners.next(filterBy);
  }
}
