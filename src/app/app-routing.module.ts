import {Component, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [{
      path: '',
      loadChildren: './home/home.module#HomeModule'
    }]
  }
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
