import {Component, OnInit} from '@angular/core';
import {SocialAuthService, SocialUser} from 'angularx-social-login';
import {AuthentificationService} from '../../Services/authentification.service';
import {ExternalAuthDto} from '../../_interface/externalAuthDto.model';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../models/user';
import {CompanyService} from '../../Services/company.service';

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
  hasCompany: boolean = false;

  constructor(
    private _authService: AuthentificationService,
    private _socialAuthService: SocialAuthService,
    private companyService: CompanyService,
    public   _router: Router,
    private _route: ActivatedRoute) {
    this._authService.authChanged.subscribe(res => {
      this.isUserAuthenticated = res;
    })


  }

  ngOnInit(): void {
    this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
    this._socialAuthService.authState.subscribe(user => {
      this.isExternalAuth = user != null;
    })
    this.getLoggedUser();
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
    this._authService.setLoggedUser({});
    this.loggedUser = {};
    this.isLoggedIn = false
    this._router.navigate(['/home']);
  }

  isUserLoggedIn() {
    const user = JSON.parse(<string>localStorage.getItem('user'));
    if (user) {
      this._authService.setLoggedUser(user);
      this.loggedUser = user;
      this.isLoggedIn = true;
    }


  }

  private validateExternalAuth(externalAuth: ExternalAuthDto) {
    this._authService.externalLogin('ExternalLogin', externalAuth)
      .subscribe(res => {
          // localStorage.setItem('user', JSON.stringify(this.user));
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          this._authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
          this._router.navigate([this._returnUrl]);
          this._authService.setLoggedUser(res.user);
        },
        error => {
          this.errorMessage = error;
          this.showError = true;
          this._authService.signOutExternal();
        });
  }

  checkUserGotCompany(id: string | undefined) {
    this.companyService.getCompanyByUserId(id).subscribe(company => {
      if (company.companyId && company.companyId > 0) {
        // if user has already a company create offer is displayed
        this.hasCompany = true;
        localStorage.setItem('USER_ROLE', 'RECRUITER')
        this.loggedUser.hasCompany = true;

      }
    })

  }

  getUserResume(user: User) {

    const resume = user.files?.filter(f => f.type === 'cv')[0];

    if (resume !== undefined) {
      this.loggedUser.hasResume = true;
      localStorage.setItem('user', JSON.stringify(user));

    }

  }

  private getLoggedUser() {
    this._authService.getLoggedUser().subscribe(user => {
      if (user.id) {
        this.getUserProfile(user.id);
        this.isLoggedIn = true;
        this.loggedUser = user;
      } else {
        this.isUserLoggedIn();
      }
    })
  }

  private getUserProfile(id: string) {
    this._authService.getUserProfile(id).subscribe(user => {
      this.loggedUser = user;

      localStorage.setItem('user', JSON.stringify(user));
      this.getUserResume(user)
    })

  }


}
