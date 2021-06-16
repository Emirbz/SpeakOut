import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../models/user';
import {JobApplyService} from '../../../Services/job-apply.service';
import {JobApply} from '../../../models/JobApply';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-list-applicants',
  templateUrl: './list-applicants.component.html',
  styleUrls: ['./list-applicants.component.scss', '../../../../assets/css/style_II.css']
})
export class ListApplicantsComponent implements OnInit {
  @Input() listCandidates: User [];
  @Input() jobApply: JobApply;
  @Output() closeEvent = new EventEmitter<boolean>();


  constructor(private jobApplyService: JobApplyService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  close() {
    this.closeEvent.emit(false);

  }

  updateJobApplyStatus(user: User, status: 'ACCEPTED' | 'DECLINED') {
    // @ts-ignore
    user.selectedJobApply.status = status;
    // @ts-ignore
    this.jobApplyService.updateJobApply(user.selectedJobApply).subscribe(() => {
      this.toastr.success('Application status updated', 'The application has been ' + status.toLocaleLowerCase());

    })
  }
}
