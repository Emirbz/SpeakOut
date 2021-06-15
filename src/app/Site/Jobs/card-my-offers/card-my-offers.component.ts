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
  @Output() jobApplicantsEvent = new EventEmitter<User[]>();


  constructor(private  authentificationService: AuthentificationService) {
  }

  ngOnInit(): void {
  }

  displayApplicants() {
    if (this.jobOffer.jobApply.length > 0) {
      const jobApplicants: User[] = [];
      this.jobOffer.jobApply.forEach(job => {
        this.authentificationService.getUserProfile(job.userId).subscribe(user => {
          jobApplicants.push(user);
          this.jobApplicantsEvent.emit(jobApplicants);
        })

      })
    }
  }
}
