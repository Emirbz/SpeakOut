import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './Compnent/navbar/navbar.component';
import { FooterComponent } from './Compnent/footer/footer.component';
import {CompnentModule} from './Compnent/compnent.module';
import { HomeComponent } from './home/home.component';
import {HomeModule} from './home/home.module';
import {JwtModule} from '@auth0/angular-jwt';
import {GoogleLoginProvider, SocialAuthService, SocialAuthServiceConfig, SocialLoginModule} from 'angularx-social-login';
import { UserProfileComponent } from './user-profile/user-profile.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserProfileComponent,
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

  providers: [SocialAuthService,{
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
export class AppModule { }
