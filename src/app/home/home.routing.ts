import { Routes } from '@angular/router';
import {UserProfileComponent} from '../user-profile/user-profile.component';



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
  { path: 'user-profile',   component: UserProfileComponent , data: {title: 'user Profile'}},
];
