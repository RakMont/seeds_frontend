import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ComboResponse} from '../models/Utils.model';
import {Role} from "../models/Volunteer.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http: HttpClient) { }
  getCountries(): Observable<ComboResponse> {
    return this.http.get<ComboResponse>('./assets/statics/countries.json');
  }
  getCountryCities(): Observable<ComboResponse> {
    return this.http.get<ComboResponse>('./assets/statics/countries.json');
  }
  getPaymentMethods(): Observable<ComboResponse> {
    return this.http.get<ComboResponse>('./assets/statics/payment_methods.json');
  }
  getNewTypes(): Observable<ComboResponse> {
    return this.http.get<ComboResponse>('./assets/statics/news_methods.json');
  }
  getReminderMethods(): Observable<ComboResponse> {
    return this.http.get<ComboResponse>('./assets/statics/reminder_methods.json');
  }
  getBeginMonths(): Observable<ComboResponse> {
    return this.http.get<ComboResponse>('./assets/statics/months.json');
  }
  getPaymentNumberDay(): Observable<ComboResponse> {
    return this.http.get<ComboResponse>('./assets/statics/payment_number_day.json');
  }
  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(environment.backend + '/seeds/volunters/roles');
  }
}
