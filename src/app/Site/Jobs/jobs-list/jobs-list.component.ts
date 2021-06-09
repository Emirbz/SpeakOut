import {Component, OnInit} from '@angular/core';
import {JobOffer} from '../../../models/JobOffer';
import {JobOfferService} from '../../../Services/job-offer.service';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss', '../../../../assets/css/style_II.css']
})
export class JobsListComponent implements OnInit {

  loadedJobs: JobOffer[] = []

  constructor(private jobOfferService: JobOfferService) {
  }

  ngOnInit(): void {
  }


  loadJobOffers() {
    this.jobOfferService.getAllJobOffers().subscribe(jobs => {
      this.loadedJobs = jobs
    }, error => {
      console.log(error)
    })

  }

}
