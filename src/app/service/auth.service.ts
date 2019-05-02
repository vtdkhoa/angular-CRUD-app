import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';

(window as any).global = window;

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private _idToken: string;
  private _accessToken: string;
  private _expiresAt: number;

  auth = new auth0.WebAuth({
    clientID: '81mk3SwvdbeIKs58vFxUhAzHV3vvm8uV',
    domain: 'votran-dangkhoa.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:4200',
    scope: 'openid'
  });

  constructor(public router: Router) {
    this._idToken = '';
    this._accessToken = '';
    this._expiresAt = 0;
  }

  getaccessToken(): string {
    return this._accessToken;
  }

  get idToken(): string {
    return this._idToken;
  }

  public login(): void {
    this.auth.authorize();
  }

  // TODO: handle authenticated login
  public handleAuthentication(): void {
    this.auth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.localLogin(authResult);
        this.router.navigate(['/dashboard']);
      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
      }
    });
  }

  private localLogin(authResult): void {
    // NOTE: Set isLoggedIn is a flag in local storage
    localStorage.setItem('isLoggedIn', 'true');
    // NOTE: Set expire time for access token
    const expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this._accessToken = authResult.accessToken;
    this._idToken = authResult.idToken;
    this._expiresAt = expiresAt;
  }

  // TODO: create a new token after access token has expired in local storage
  public renewToken(): void {
    this.auth.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.localLogin(authResult);
      } else if (err) {
        alert(`Could not get a new token (${err.error}: ${err.errorDescription}).`);
        this.logout();
      }
    });
  }

  public logout(): void {
    // NOTE: Delete token and expired token
    this._accessToken = '';
    this._idToken = '';
    this._expiresAt = 0;
    // NOTE: Delete isLoggedIn from local storage
    localStorage.removeItem('isLoggedIn');
    // NOTE: After delete, go to route home (Welcome Component)
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // NOTE: Check expired access token
    return new Date().getTime() < this._expiresAt;
  }
}
