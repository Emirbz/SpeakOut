import {Component, OnInit} from '@angular/core';
import {JobOfferService} from '../../services/job-offer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  listJobOffer: any;

  constructor( private JobOffer: JobOfferService ) { }

  ngOnInit(): void {
    this.JobOffer.getAllJobOffers().subscribe( data => {

      this.listJobOffer = data;
    });
  }

}
