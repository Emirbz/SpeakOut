import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Company} from '../../../models/Company';
import {CompanyService} from '../../../Services/company.service';
import {JobOffer} from '../../../models/JobOffer';
import {JobOfferService} from '../../../Services/job-offer.service';

@Component({
  selector: 'app-companies-details',
  templateUrl: './companies-details.component.html',
  styleUrls: ['./companies-details.component.scss', '../../../../assets/css/style_II.css']
})
export class CompaniesDetailsComponent implements OnInit {

  loadedCompany: Company;
  loadedJobs: JobOffer[] = []

  constructor(private companyService: CompanyService,
              private route: ActivatedRoute,
              private jobOfferService: JobOfferService) {
  }

  ngOnInit(): void {
    this.loadSingleCompany();
    this.loadJobOffers();

  }

  loadJobOffers() {
    const id = this.route.snapshot.paramMap.get('id') as string;
    // get all jobs offers and filter by company id
    this.jobOfferService.getAllJobOffers(null).subscribe(jobs => {
      this.loadedJobs = jobs.filter(j => (String(j.companyId) === id && j.isValid));

    }, error => {
      console.log(error)
    })

  }

  private loadSingleCompany() {
    const id = this.route.snapshot.paramMap.get('id');
    this.companyService.getCompanyById(id).subscribe(c => {
      this.loadedCompany = c;

    });
  };


}
