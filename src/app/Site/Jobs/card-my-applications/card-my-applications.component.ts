import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JobApply} from '../../../models/JobApply';
import {User} from '../../../models/user';

declare var JitsiMeetExternalAPI: any;


@Component({
  selector: 'app-card-my-applications',
  templateUrl: './card-my-applications.component.html',
  styleUrls: ['./card-my-applications.component.scss']
})
export class CardMyApplicationsComponent implements OnInit {
  @Input() jobApply: JobApply;
  @Output() meetingEvent = new EventEmitter<boolean>();
  @Output() jobApplyMeeting = new EventEmitter<JobApply>();
  loggedUser: User;

  constructor() {
  }

  ngOnInit(): void {
    this.getLoggedUser();
  }

  onfinish() {
    console.log('finish')
  }

  reformMeetingTime(applyDate: string) {
    return (new Date(applyDate).getTime() / 1000) as number;

  }

  generateMeeting() {
  this.jobApplyMeeting.emit(this.jobApply);
    this.meetingEvent.emit(true);
  }

  private getLoggedUser() {
    this.loggedUser = JSON.parse(<string>localStorage.getItem('user'));
  }


}
