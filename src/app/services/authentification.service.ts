import {Injectable} from '@angular/core';
import {GoogleLoginProvider, SocialAuthService} from 'angularx-social-login';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthResponseDto} from '../_interface/reponse/authResponseDto.model';
import {ExternalAuthDto} from '../_interface/externalAuthDto.model';
import {EnvironmentUrlService} from './environment-url.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {StorageService} from './storage.service';
import {User} from '../models/user';
import {apiConfig} from '../config/apiConfig';
import {Company} from '../models/Company';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  userApi = apiConfig.apis.user;

  private _authChangeSub = new Subject<boolean>()
  public authChanged = this._authChangeSub.asObservable();

  private _loggedUser = new BehaviorSubject<User>({})
  public loggedUser = this._loggedUser.asObservable();

  constructor(private _http: HttpClient, private _envUrl: EnvironmentUrlService, private storageService: StorageService,
              private _jwtHelper: JwtHelperService, private _externalAuthService: SocialAuthService) {
  }

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

  public setLoggedUser = (user: User) => {
    this._loggedUser.next(user);
  }


  getLoggedUser(): Observable<User> {
    return this.loggedUser;
  }

  getUserProfile(userId: String): Observable<User> {
    return this._http.get<User>(`${this.userApi}/byId?id=${userId}`);

  }

  updateUser(updatedUser: User): Observable<User> {

    return this._http.put<Company>(`${this.userApi}/update`, updatedUser);
  }
}
