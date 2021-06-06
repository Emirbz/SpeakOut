import { Injectable } from '@angular/core';
import { SocialAuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthResponseDto} from '../_interface/reponse/authResponseDto.model';
import {ExternalAuthDto} from '../_interface/externalAuthDto.model';
import {EnvironmentUrlService} from './environment-url.service';
import { Subject } from 'rxjs';
import { StorageService } from './storage.service';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': 'https://localhost:5001/api/v1',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '\'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token\'',


  })};
@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private _authChangeSub = new Subject<boolean>()
  public authChanged = this._authChangeSub.asObservable();

  constructor(private _http: HttpClient, private _envUrl: EnvironmentUrlService , private storageService  : StorageService ,
              private _jwtHelper: JwtHelperService , private _externalAuthService: SocialAuthService) {}
  public signInWithGoogle = () => {
    return this._externalAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  public logout() {
    this.storageService.removeStorage();
    this.sendAuthStateChangeNotification(false);
  }
  public signOutExternal = () => {
    this._externalAuthService.signOut();
  }
  public externalLogin = (route: string, body: ExternalAuthDto) => {
    return this._http.post<AuthResponseDto>(this.createCompleteRoute(route, this._envUrl.apiUrl), body, httpOptions);
  }
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this._authChangeSub.next(isAuthenticated);
  }
}
