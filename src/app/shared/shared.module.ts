import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NoopAnimationsModule,
    ToastrModule.forRoot(),
  ]
})
export class SharedModule {
}
