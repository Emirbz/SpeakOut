import {Component, OnInit} from '@angular/core';
import {CompanyService} from '../../../Services/company.service';
import {Company} from '../../../models/Company';
import {JobOfferService} from '../../../Services/job-offer.service';
import {JobOffer} from '../../../models/JobOffer';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.scss', '../../../../assets/css/style_II.css']
})
export class CompaniesListComponent implements OnInit {
  loadedCompanies: Company[] = [];
  loadedJobOffers: JobOffer [] = [];

  constructor(private companyService: CompanyService,
              private jobOfferService: JobOfferService) {
  }

  ngOnInit(): void {
    this.loadJobOffer();
  }

  private loadCompanies() {
    this.companyService.getAllCompanies().subscribe(companies => {
      this.loadedCompanies = companies.map(c => {
        // add list of jobApply to for each jobOffer
        c.jobOffer = this.loadedJobOffers.filter(j => j.companyId === c.companyId);
        return c;
      });
    })

  }


  private loadJobOffer() {
    this.jobOfferService.getAllJobOffers(null).subscribe(jobOffers => {
      this.loadedJobOffers = jobOffers;
      this.loadCompanies();
    })

  }
}
