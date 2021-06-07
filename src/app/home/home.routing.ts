import {Routes} from '@angular/router';
import {UserProfileComponent} from '../Site/user-profile/user-profile.component';
import {DashboardComponent} from '../Site/dashboard/dashboard.component';
import {CompaniesListComponent} from '../Site/Companies/companies-list/companies-list.component';
import {CompaniesDetailsComponent} from '../Site/Companies/companies-details/companies-details.component';


export const HomeRoutes: Routes = [
  // {
  //   path: '',
  //   children: [ {
  //     path: 'dashboard',
  //     component: DashboardComponent
  // }]}, {
  // path: '',
  // children: [ {
  //   path: 'userprofile',
  //   component: UserProfileComponent
  // }]
  // },  {
  //      path: '',
  //     children: [ {
  //     path: 'JobOffer',
  //      component: JobOfferComponent
  //     }]
  //     },{
  //      path: '',
  //     children: [ {
  //     path: 'JobPost',
  //      component: JobPostComponent
  //     }]
  //     },
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'user-profile', component: UserProfileComponent, data: {title: 'user Profile'}},
  {path: 'companies', component: CompaniesListComponent},
  {path: 'companies/:id', component: CompaniesDetailsComponent},
  {path: 'home', component: DashboardComponent},
];
