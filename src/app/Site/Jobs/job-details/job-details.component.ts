import {Component, OnInit} from '@angular/core';
import {JobOffer} from '../../../models/JobOffer';
import {JobOfferService} from '../../../Services/job-offer.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss', '../../../../assets/css/style_II.css']
})
export class JobDetailsComponent implements OnInit {
  loadedJobOffer: JobOffer;

  constructor(private jobOfferService: JobOfferService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loadSingleJobOffer();
  }

  private loadSingleJobOffer() {
    const id = this.route.snapshot.paramMap.get('id');
    this.jobOfferService.getJobOfferById(id).subscribe(job => {
      this.loadedJobOffer = job;
    });
  };

}
