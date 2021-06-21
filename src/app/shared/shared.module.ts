import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {DeleteModalComponent} from './modals/delete-modal/delete-modal.component';
import {InterviewModalComponent} from './modals/interview-modal/interview-modal.component';
import {JitsiFrameComponent} from './jitsi/jitsi-frame/jitsi-frame.component';


@NgModule({
    declarations: [
        DeleteModalComponent,
        InterviewModalComponent,
        JitsiFrameComponent
    ],
  exports: [
    DeleteModalComponent,
    InterviewModalComponent,
    JitsiFrameComponent
  ],
    imports: [
        CommonModule,
        NoopAnimationsModule,
        ToastrModule.forRoot(),
    ]
})
export class SharedModule {
}
