import {Component, OnInit} from '@angular/core';
import {JobOffer} from '../../models/JobOffer';
import {JobOfferService} from '../../Services/job-offer.service';
import {User} from '../../models/user';
import {JobApplyService} from '../../Services/job-apply.service';
import {JobApply} from '../../models/JobApply';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  loadedJobs: JobOffer[] = []
  loggedUser: User;

  constructor(private jobOfferService: JobOfferService,
              private jobApplyService: JobApplyService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getLoggedUser();
    this.loadJobOffers();

  }


  loadJobOffers() {
    this.jobOfferService.getAllJobOffers(null).subscribe(jobs => {
      this.loadedJobs = jobs.filter(j => j.isValid).map(job => {

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
    console.log(job.jobApply.some(jobApply => jobApply.userId === this.loggedUser.id))
    job.userApplied = job.jobApply.some(jobApply => jobApply.userId === this.loggedUser.id);
  }

  applyJob(job: JobOffer) {
    job.userApplied = true;
    const jobApply = new JobApply();
    jobApply.applyId = Math.floor(Math.random() * 145879) + 1;
    jobApply.userId = this.loggedUser.id;
    jobApply.status = 'PENDING';
    jobApply.isValid = true;
    jobApply.jobId = job.jobId;
    this.jobApplyService.createJobApply(jobApply).subscribe(value => {
      this.toastr.success('Job Applied', 'Your Apply have been sent successfully');
      const jobOffer = this.loadedJobs.find(j => j.jobId = job.jobId) as JobOffer;

      jobOffer.jobApply.push(jobApply);



    })

  }

  private getLoggedUser() {
    this.loggedUser = JSON.parse(<string>localStorage.getItem('user'));
    console.log(this.loggedUser)
  }

  private loadJobAppliesByJob(job: JobOffer) {
    this.jobApplyService.getJobApplyByJobOffer(job.jobId).subscribe(jobApply => {
      job.jobApply = jobApply;
      this.checkUserHasApplied(job)
    })
  }
}
