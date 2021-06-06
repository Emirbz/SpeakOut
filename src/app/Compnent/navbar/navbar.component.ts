import { Component, OnInit } from '@angular/core';
import {SocialAuthService, SocialUser , GoogleLoginProvider} from 'angularx-social-login';
import {AuthentificationService} from '../../Services/authentification.service';
import {ExternalAuthDto} from '../../_interface/externalAuthDto.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public showError !: boolean ;
  public errorMessage = '';
  isLoggedin = false ;
  public isExternalAuth !: boolean;
 public  user !: SocialUser ;
  private _returnUrl !: string ;
  public isUserAuthenticated !: boolean;
  constructor(private _authService: AuthentificationService , private _socialAuthService: SocialAuthService , private   _router: Router , private _route: ActivatedRoute) {
    this._authService.authChanged
      .subscribe(res => {
        this.isUserAuthenticated = res; })
  }

  ngOnInit(): void {
    this._authService.authChanged
      .subscribe(res => {
        this.isUserAuthenticated = res;
      })
    this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
    this._socialAuthService.authState.subscribe(user => {
      this.isExternalAuth = user != null;
    })
  }
  public externalLogin = () => {

    this.showError = false;
    this._authService.signInWithGoogle()
      .then(res => {
        const user: SocialUser = {...res};

        console.log(user.provider);

        const externalAuth: ExternalAuthDto = {
          provider: user.provider,
          idToken: user.idToken
        }
        this.validateExternalAuth(externalAuth);
      }, error => console.log(error))
  }
  private validateExternalAuth(externalAuth: ExternalAuthDto) {
    console.log('aaaaa');
    this._authService.externalLogin('ExternalLogin', externalAuth)
      .subscribe(res => {
          console.log('bbbb');
          // localStorage.setItem('user', JSON.stringify(this.user));
          this.isLoggedin= true;
          localStorage.setItem('token', res.token);
          localStorage.setItem('userResponse', res.user.id);
          localStorage.setItem('user', JSON.stringify(res.user));
          this._authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
          this._router.navigate([this._returnUrl]);
        },
        error => {
          this.errorMessage = error;
          this.showError = true;
          this._authService.signOutExternal();
        });
  }
  public logout = () => {
    this._authService.logout();
    if(this.isExternalAuth)
      this._authService.signOutExternal();
    this._router.navigate(['/']);
  }
}
