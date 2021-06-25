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
import {CreateCompanyComponent} from './Site/Companies/create-company/create-company.component';
import {ReactiveFormsModule} from '@angular/forms';
import {UpdateUserComponent} from './Site/user-profile/update-user/update-user.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {CardMyOffersComponent} from './Site/Jobs/card-my-offers/card-my-offers.component';
import {CardMyApplicationsComponent} from './Site/Jobs/card-my-applications/card-my-applications.component';
import {ListApplicantsComponent} from './Site/Jobs/list-applicants/list-applicants.component';
import {UpdateJobComponent} from './Site/Jobs/update-job/update-job.component';
import {SharedModule} from './shared/shared.module';
import {UpdateCompanyComponent} from './Site/Companies/update-company/update-company.component';
import { FileUploaderComponent } from './Site/user-profile/file-uploader/file-uploader.component';

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
    JobDetailsComponent,
    CreateCompanyComponent,
    UpdateUserComponent,
    CardMyOffersComponent,
    CardMyApplicationsComponent,
    ListApplicantsComponent,
    UpdateJobComponent,
    UpdateCompanyComponent,
    FileUploaderComponent,
  ],
    imports: [
        BrowserModule,
        NoopAnimationsModule,
        AppRoutingModule,
        CompnentModule,
        HttpClientModule,
        RouterModule,
        SocialLoginModule,
        ToastrModule.forRoot(),

        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
            }//
        }),
        ReactiveFormsModule,
        SharedModule,
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
