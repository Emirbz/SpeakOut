import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {DeleteModalComponent} from './modals/delete-modal/delete-modal.component';


@NgModule({
    declarations: [
        DeleteModalComponent
    ],
    exports: [
        DeleteModalComponent
    ],
    imports: [
        CommonModule,
        NoopAnimationsModule,
        ToastrModule.forRoot(),
    ]
})
export class SharedModule {
}
