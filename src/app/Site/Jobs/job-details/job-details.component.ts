import {Component, OnInit} from '@angular/core';
import {JobOffer} from '../../../models/JobOffer';
import {JobOfferService} from '../../../Services/job-offer.service';
import {ActivatedRoute} from '@angular/router';
import {JobApplyService} from '../../../Services/job-apply.service';
import {User} from '../../../models/user';
import {JobApply} from '../../../models/JobApply';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss', '../../../../assets/css/style_II.css']
})
export class JobDetailsComponent implements OnInit {
  loadedJobOffer: JobOffer;
  loggedUser: User;

  constructor(private jobOfferService: JobOfferService,
              private route: ActivatedRoute,
              private jobApplyService: JobApplyService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getLoggedUser();

    this.loadSingleJobOffer();
  }

  checkUserHasApplied(job: JobOffer) {

    if (job.jobApply !== undefined && this.loggedUser) {

      return job.jobApply.some(jobApply => jobApply.userId === this.loggedUser.id);
    }
    return false;
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
      this.loadedJobOffer.jobApply.push(jobApply);


    })

  }

  private loadSingleJobOffer() {
    const id = this.route.snapshot.paramMap.get('id');
    this.jobOfferService.getJobOfferById(id).subscribe(job => {
      this.loadedJobOffer = job;
      this.loadJobAppliesByJob(this.loadedJobOffer);
    });
  };

  private loadJobAppliesByJob(job: JobOffer) {
    this.jobApplyService.getJobApplyByJobOffer(job.jobId).subscribe(jobApply => {
      job.jobApply = jobApply;
    })
  }

  private getLoggedUser() {
    this.loggedUser = JSON.parse(<string>localStorage.getItem('user'));
  }
}

