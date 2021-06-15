import {Component, OnInit} from '@angular/core';
import {JobOffer} from '../../../models/JobOffer';
import {JobOfferService} from '../../../Services/job-offer.service';
import {JobApplyService} from '../../../Services/job-apply.service';
import {User} from '../../../models/user';
import {AuthentificationService} from '../../../Services/authentification.service';
import {JobApply} from '../../../models/JobApply';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss', '../../../../assets/css/style_II.css']
})
export class JobsListComponent implements OnInit {

  loadedJobs: JobOffer[] = []
  loggedUser: User;
  hasResume: boolean = false;

  constructor(private jobOfferService: JobOfferService,
              private jobApplyService: JobApplyService,
              private authentificationService: AuthentificationService,
              private toastr: ToastrService) {
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

    if (job.jobApply !== undefined && this.loggedUser) {

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

  applyJob(job: JobOffer) {
    const jobApply = new JobApply();
    jobApply.applyId = Math.floor(Math.random() * 145879) + 1;
    jobApply.userId = this.loggedUser.id;
    jobApply.status = 'PENDING';
    jobApply.isValid = true;
    jobApply.jobId = job.jobId;
    this.jobApplyService.createJobApply(jobApply).subscribe(value => {
      this.toastr.success('Job Applied', 'Your Apply have been sent successfully');
      const jobOffer = this.loadedJobs.find(j => j.jobId = job.jobId);
      // @ts-ignore
      jobOffer.jobApply.push(jobApply);


    })

  }

  private getLoggedUser() {
    this.loggedUser = JSON.parse(<string>localStorage.getItem('user'));
    console.log(this.loggedUser)
  }
}
