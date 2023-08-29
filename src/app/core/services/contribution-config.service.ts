import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ContributionConfigService {

  constructor(private http: HttpClient) { }

  getContributionConfigById(id): Observable<any> {
    const p = new HttpParams().set('id', id);
    return this.http.get<any>(environment.backend + '/seeds/contribution/getContributionConfigById'
      , { params: p });
  }
}
