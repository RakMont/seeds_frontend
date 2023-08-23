import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  public getToken(): string {
    console.log('token key', localStorage.getItem('TOKEN_KEY'));
    return localStorage.getItem('TOKEN_KEY');
  }

  public setToken(token: string): void {
    // sessionStorage.removeItem(TOKEN_KEY);
    // sessionStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem('TOKEN_KEY', token);

  }

  logOut(): void {
    localStorage.clear();
  }
}
