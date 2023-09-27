import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Table} from '../models/Table.model';
import {environment} from '../../../environments/environment';
import {Role, Volunter, VolunterFilter} from '../models/Volunteer.model';
import {BoxSeed} from "../models/Seed.model";

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {
  constructor(private http: HttpClient) { }
  formData: any;
  // tslint:disable-next-line:variable-name
  private _listeners = new Subject<any>();

  listVolunteers(status: string): Observable<Table> {
    const p = new HttpParams().set('status', status);
    return this.http.get<Table>(environment.backend + '/seeds/volunteers/all/', { params: p });
  }
  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(environment.backend + '/seeds/volunteers/roles');
  }
  listExiteVolunteers(): Observable<Table> {
    const p = new HttpParams().set('status', 'INACTIVE');
    return this.http.get<Table>(environment.backend +
      '/seeds/volunteers/exitvolunters', { params: p });
  }

  listTrackingVolunteers(): Observable<Table> {
    //return this.http.get<Table>('./assets/statics/trackingvolunters.json');
    return this.http.get<Table>(environment.backend + '/seeds/volunteers/trackingVolunteers/');
  }
  getVolunteer(volunteerId?: any): Observable<Volunter> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    const p = new HttpParams().set('id', volunteerId ? volunteerId : "");
    return this.http.get<Volunter>(environment.backend +
      '/seeds/volunteers/getVolunter', { params: p });
  }

  addVolunteer(volunter: Volunter): Observable<any> {
    return this.http.post<any>(environment.backend + '/seeds/volunteers/create/', volunter);
  }

  updateVolunteer(volunter: Volunter): Observable<any> {
    return this.http.put<any>(environment.backend + '/seeds/volunteers/updateVolunter',  volunter);
  }

  exitVolunteer(payload: any): Observable<any>{
    return this.http.post<any>(environment.backend + '/seeds/volunteers/exitVolunter', payload
    );
  }

  activateVolunteer(payload: any): Observable<any>{
    return this.http.post<any>(environment.backend + '/seeds/volunteers/activateVolunter', payload
    );
  }

  deleteVolunteer(payload: any): Observable<any>{
    return this.http.post<any>(environment.backend + '/seeds/volunteers/deleteVolunter', payload
    );
  }

  listVolunteerExitMessages(id: string): Observable<any> {
    const p = new HttpParams().set('volunterId', id);
    return this.http.get<any>(environment.backend + '/seeds/volunteers/getExitMessages', { params: p });
  }

  updateVolunteerPassword(payload: any): Observable<any>{
    console.log('updateVolunteerPassword', payload);
    return this.http.post<any>(environment.backend + '/seeds/volunteers/updateVolunteerPassword', payload
    );
  }

  listExitVolunteer(filter: VolunterFilter): Observable<Volunter[]> {
    const p = new HttpParams()
      .set('status', filter.status)
      .set('roleId', filter.roleId);

    return this.http.get<Volunter[]>(environment.backend + '/seeds/volunteers/exitvolunters');
  }

  getComboTrackingVolunteers(): Observable<BoxSeed[]>{
    //return this.http.get<BoxSeed[]>(/*environment.backend + */'./assets/statics/activeseeds.json');
    return this.http.get<BoxSeed[]>(environment.backend + '/seeds/volunteers/comboTrackingVolunteers');
  }

  listen(): Observable<any> {
    return this._listeners.asObservable();
  }

  // tslint:disable-next-line:typedef
  filter(filterBy: string) {
    this._listeners.next(filterBy);
  }
}
