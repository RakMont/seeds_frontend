import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {PayloadLogin} from "../models/Utils.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  oauthURL = 'http://localhost:8080/oauth/';

  constructor(private httpClient: HttpClient) { }

  loginVolunter(payload: PayloadLogin): Observable<any> {
    return this.httpClient.post<any>(environment.backend + '/oauth/generate-token', payload);
  }

  public login(token: any){
    localStorage.setItem('token', token);
  }

  public isLoggedIn(): boolean{
    const tokenStr = localStorage.getItem('token');
    if (tokenStr === undefined || tokenStr === '' || tokenStr === null){
      return false;
    } else { return true; }
  }

  public logout(): boolean{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  public getToken(): any{
    return localStorage.getItem('token');
  }

  public setUser(user): any{
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(): any{
    const userStr = localStorage.getItem('user');
    if (userStr != null){
      return JSON.parse(userStr);
    }else {
      this.logout();
      return null;
    }
  }

  public getCurrentUser(): Observable<any>{
    return this.httpClient.get(environment.backend + '/oauth/actual-usuario');
  }

  // tslint:disable-next-line:typedef
  public getUserRoles(){
    const user = this.getUser();
    console.log('user', user);
    return user.roles;
  }
}
