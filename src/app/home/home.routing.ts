import {Routes} from '@angular/router';
import {UserProfileComponent} from '../Site/user-profile/user-profile.component';
import {DashboardComponent} from '../Site/dashboard/dashboard.component';
import {CompaniesListComponent} from '../Site/Companies/companies-list/companies-list.component';
import {CompaniesDetailsComponent} from '../Site/Companies/companies-details/companies-details.component';
import {CreateOfferComponent} from '../Site/Jobs/create-offer/create-offer.component';
import {JobsListComponent} from '../Site/Jobs/jobs-list/jobs-list.component';
import {JobDetailsComponent} from '../Site/Jobs/job-details/job-details.component';
import {AuthGuardGuard} from '../shared/guard/auth-guard.guard';
import {UpdateJobComponent} from '../Site/Jobs/update-job/update-job.component';
import {UpdateCompanyComponent} from '../Site/Companies/update-company/update-company.component';


export const HomeRoutes: Routes = [

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
  {path: 'home', component: DashboardComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuardGuard]},
  {path: 'companies', component: CompaniesListComponent},
  {path: 'companies/update/:id', component: UpdateCompanyComponent},
  {path: 'companies/:id', component: CompaniesDetailsComponent},
  {path: 'jobs/create', component: CreateOfferComponent, canActivate: [AuthGuardGuard], data: {roles: ['RECRUITER']}},
  {path: 'jobs', component: JobsListComponent},
  {path: 'jobs/update/:id', component: UpdateJobComponent},
  {path: 'job/:id', component: JobDetailsComponent},
];
