import {Component, OnInit} from '@angular/core';
import {JobOffer} from '../../models/JobOffer';
import {JobOfferService} from '../../Services/job-offer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  loadedJobs: JobOffer[] = []

  constructor(private jobOfferService: JobOfferService) {
  }

  ngOnInit(): void {
    this.loadJobOffers();
  }


  loadJobOffers() {
    this.jobOfferService.getAllJobOffers().subscribe(jobs => {
      this.loadedJobs = jobs
    }, error => {
      console.log(error)
    })

  }

}
