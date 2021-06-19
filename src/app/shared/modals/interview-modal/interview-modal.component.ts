import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JobApply} from '../../../models/JobApply';
import {ToastrService} from 'ngx-toastr';
import {JobApplyService} from '../../../Services/job-apply.service';

@Component({
  selector: 'app-interview-modal',
  templateUrl: './interview-modal.component.html',
  styleUrls: ['./interview-modal.component.scss']
})
export class InterviewModalComponent implements OnInit {

  @Input() jobApply: JobApply | undefined;
  @Output() applyConfirmed = new EventEmitter<JobApply>();

  constructor(private toastr: ToastrService,
              private jobApplyService: JobApplyService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    $('#interview-modal').appendTo('body')
  }

  todayDate() {
    const date = new Date();
    return (date.getFullYear().toString() + '-'
      + ('0' + (date.getMonth() + 1)).slice(-2) + '-'
      + ('0' + (date.getDate())).slice(-2))
      + 'T' + date.toTimeString().slice(0, 5);
  }

  confirmInterview(date: string) {

    // @ts-ignore
    this.jobApply.applyDate = date;
    // @ts-ignore
    this.jobApplyService.updateJobApply(this.jobApply).subscribe(() => {
      this.applyConfirmed.emit(this.jobApply)
      // @ts-ignore
      $('#interview-modal').modal('toggle');

    })


  }
}
