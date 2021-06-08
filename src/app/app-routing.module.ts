import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';

const routes: Routes = [
  {path: '', loadChildren: () => import('src/app/home/home.module').then(m => m.HomeModule)}


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes) ,
    CommonModule,
    BrowserModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
