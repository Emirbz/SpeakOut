import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CompnentModule} from './Compnent/compnent.module';
import {HomeComponent} from './home/home.component';
import {JwtModule} from '@auth0/angular-jwt';
import {GoogleLoginProvider, SocialAuthService, SocialAuthServiceConfig, SocialLoginModule} from 'angularx-social-login';
import {DashboardComponent} from './Site/dashboard/dashboard.component';
import {UserProfileComponent} from './Site/user-profile/user-profile.component';
import {CompaniesListComponent} from './Site/Companies/companies-list/companies-list.component';
import {CompaniesDetailsComponent} from './Site/Companies/companies-details/companies-details.component';
import {CreateOfferComponent} from './Site/Jobs/create-offer/create-offer.component';
import {JobsListComponent} from './Site/Jobs/jobs-list/jobs-list.component';
import {JobDetailsComponent} from './Site/Jobs/job-details/job-details.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    UserProfileComponent,
    CompaniesListComponent,
    CompaniesDetailsComponent,
    CreateOfferComponent,
    JobsListComponent,
    JobDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CompnentModule,
    HttpClientModule,
    RouterModule,
    SocialLoginModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      }//
    }),
  ],

  providers: [SocialAuthService, {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '1095680891857-2jta4tb582s9tn612jrnpq7g656hhjfd.apps.googleusercontent.com'
          )
        },
      ],
    } as SocialAuthServiceConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
