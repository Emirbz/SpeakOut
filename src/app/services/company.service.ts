import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EnvironmentUrlService} from './environment-url.service';
import {StorageService} from './storage.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {SocialAuthService} from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private _http: HttpClient, private _envUrl: EnvironmentUrlService, private storageService: StorageService,
              private _jwtHelper: JwtHelperService, private _externalAuthService: SocialAuthService) {
  }

}
