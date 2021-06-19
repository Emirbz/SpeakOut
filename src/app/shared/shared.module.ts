import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {DeleteModalComponent} from './modals/delete-modal/delete-modal.component';
import {InterviewModalComponent} from './modals/interview-modal/interview-modal.component';


@NgModule({
    declarations: [
        DeleteModalComponent,
        InterviewModalComponent
    ],
  exports: [
    DeleteModalComponent,
    InterviewModalComponent
  ],
    imports: [
        CommonModule,
        NoopAnimationsModule,
        ToastrModule.forRoot(),
    ]
})
export class SharedModule {
}
