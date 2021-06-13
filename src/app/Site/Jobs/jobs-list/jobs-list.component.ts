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
    this.loadJobOffers();
  }


  loadJobOffers() {
    this.jobOfferService.getAllJobOffers().subscribe(jobs => {
      this.loadedJobs = jobs
    }, error => {
      console.log(error)
    })

  }


  shortenTitle(attribute: string, maxLength: number, from: number, to: number) {
    if (attribute && attribute.length > maxLength) {

      attribute = attribute.substring(from, to) + '...';
    }
    return `${attribute}`;
  }
}
