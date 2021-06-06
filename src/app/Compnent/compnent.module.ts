import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
/*import { SidebarComponent } from './sidebar/sidebar.component';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {TranslateModule} from '@ngx-translate/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';*/

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
/*    MatIconModule,
    MatSelectModule,
    TranslateModule,
    MatMenuModule,
    MatToolbarModule,*/
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    DashboardComponent,
   /* SidebarComponent*/
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    DashboardComponent
  ]
})
export class CompnentModule { }
