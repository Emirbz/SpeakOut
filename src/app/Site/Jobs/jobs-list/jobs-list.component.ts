import {Component, OnInit} from '@angular/core';
import {JobOffer} from '../../../models/JobOffer';
import {JobOfferService} from '../../../Services/job-offer.service';
import {JobApplyService} from '../../../Services/job-apply.service';
import {User} from '../../../models/user';
import {AuthentificationService} from '../../../Services/authentification.service';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss', '../../../../assets/css/style_II.css']
})
export class JobsListComponent implements OnInit {

  loadedJobs: JobOffer[] = []
  loggedUser: User;

  constructor(private jobOfferService: JobOfferService,
              private jobApplyService: JobApplyService,
              private authentificationService: AuthentificationService) {
  }

  ngOnInit(): void {
    this.getLoggedUser();
    this.loadJobOffers();
  }


  loadJobOffers() {
    this.jobOfferService.getAllJobOffers().subscribe(jobs => {
      this.loadedJobs = jobs.map(job => {
        // add list of jobApply to for each jobOffer
        this.loadJobAppliesByJob(job);
        return job;
      });
    }, error => {
      console.log(error)
    }, () => {
      console.log(this.loadedJobs)
    })

  }

  checkUserHasApplied(job: JobOffer) {

    if (job.jobApply !== undefined) {

      return job.jobApply.some(jobApply => jobApply.userId === this.loggedUser.id);
    }
    return false;
  }


  shortenTitle(attribute: string, maxLength: number, from: number, to: number) {
    if (attribute && attribute.length > maxLength) {

      attribute = attribute.substring(from, to) + '...';
    }
    return `${attribute}`;
  }

  private loadJobAppliesByJob(job: JobOffer) {
    this.jobApplyService.getJobApplyByJobOffer(job.jobId).subscribe(jobApply => {
      job.jobApply = jobApply;
    })
  }

  private getLoggedUser() {
    this.authentificationService.getLoggedUser().subscribe(user => {
      if (user.id) {
        this.loggedUser = user;

      }
    });
  }
}
