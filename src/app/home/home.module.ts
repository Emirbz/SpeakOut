import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomeRoutes} from './home.routing';
import {AuthGuardGuard} from '../shared/guard/auth-guard.guard';


// @ts-ignore
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(HomeRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [],
  providers: [AuthGuardGuard],
  declarations: []
})

export class HomeModule {}
