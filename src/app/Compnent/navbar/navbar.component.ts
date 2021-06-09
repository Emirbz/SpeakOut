import {Component, OnInit} from '@angular/core';
import {SocialAuthService, SocialUser} from 'angularx-social-login';
import {AuthentificationService} from '../../Services/authentification.service';
import {ExternalAuthDto} from '../../_interface/externalAuthDto.model';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public showError !: boolean;
  public errorMessage = '';
  public isExternalAuth !: boolean;
  public user !: SocialUser;
  /* ---- logged user --- */
  loggedUser: User;
  public isUserAuthenticated !: boolean;
  isLoggedIn = false;
  private _returnUrl !: string;

  constructor(
    private _authService: AuthentificationService,
    private _socialAuthService: SocialAuthService,
    public   _router: Router,
    private _route: ActivatedRoute) {
    this._authService.authChanged.subscribe(res => {
      this.isUserAuthenticated = res;
    })
    this.isUserLoggedIn();


  }

  ngOnInit(): void {
    this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
    this._socialAuthService.authState.subscribe(user => {
      this.isExternalAuth = user != null;
    })

  }


  isUserLoggedIn() {
    const user = JSON.parse(<string>localStorage.getItem('user'));
    if (user) {
      this.loggedUser = user;
      this.isLoggedIn = true;
    }


  }

  externalLogin() {
    this.showError = false;
    this._authService.signInWithGoogle()
      .then(res => {
        const user: SocialUser = {...res};
        const externalAuth: ExternalAuthDto = {
          provider: user.provider,
          idToken: user.idToken
        }
        this.validateExternalAuth(externalAuth);
      }, error => console.log(error))
  }

  public logout() {
    this._authService.logout();
    if (this.isExternalAuth) {
      this._authService.signOutExternal();
    }
    this._router.navigate(['/']);
  }

  private validateExternalAuth(externalAuth: ExternalAuthDto) {
    this._authService.externalLogin('ExternalLogin', externalAuth)
      .subscribe(res => {
          // localStorage.setItem('user', JSON.stringify(this.user));
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          this._authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
          this._router.navigate([this._returnUrl]);
          this.loggedUser = res.user;
        },
        error => {
          this.errorMessage = error;
          this.showError = true;
          this._authService.signOutExternal();
        });
  }
}
