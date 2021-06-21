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
  isAccepted: boolean = false;
  selectedJobApply: JobApply | undefined;
  @Output() meetingEvent = new EventEmitter<boolean>();
  @Output() jobApplyMeeting = new EventEmitter<JobApply>();


  constructor(private jobApplyService: JobApplyService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  close() {
    this.closeEvent.emit(false);

  }

  openModalInterview(user: User) {
    this.isAccepted = true;
    this.selectedJobApply = user.selectedJobApply;
  }

  updateJobApplyStatus(jobApply: JobApply | undefined, status: 'ACCEPTED' | 'DECLINED') {

    // @ts-ignore
    jobApply.status = status;
    // @ts-ignore
    this.jobApplyService.updateJobApply(jobApply).subscribe(() => {
      this.toastr.success('Application status updated', 'The application has been ' + status.toLocaleLowerCase());

    })

  }


  generateMeeting(u: User) {
    this.jobApplyMeeting.emit(u.selectedJobApply);
    this.meetingEvent.emit(true);
  }
}
