import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JobOffer} from '../../../models/JobOffer';
import {User} from '../../../models/user';
import {AuthentificationService} from '../../../Services/authentification.service';

@Component({
  selector: 'app-card-my-offers',
  templateUrl: './card-my-offers.component.html',
  styleUrls: ['./card-my-offers.component.scss']
})
export class CardMyOffersComponent implements OnInit {
  @Input() jobOffer: JobOffer;
  @Input() deletedJobId: string;


  @Output() jobApplicantsEvent = new EventEmitter<User[]>();
  @Output() deleteJobEvent = new EventEmitter<JobOffer>();



  constructor(private  authentificationService: AuthentificationService) {
  }

  ngOnInit(): void {

  }

  displayApplicants() {
    if (this.jobOffer.jobApply.length > 0) {
      const jobApplicants: User[] = [];
      this.jobOffer.jobApply.forEach(job => {
        this.authentificationService.getUserProfile(job.userId).subscribe(user => {
          user.resume = this.getUserResume(user);
          user.selectedJobApply = job;
          jobApplicants.push(user);
          this.jobApplicantsEvent.emit(jobApplicants);
        })

      })

    }
  }

  getUserResume(user: User) {

    return user.files?.filter(f => f.type === 'cv')[user.files?.filter(f => f.type === 'cv').length - 1];


  }

  openModalDelete(jobOffer: JobOffer) {
    this.deleteJobEvent.emit(jobOffer);


  }
}
