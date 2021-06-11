import {Component, OnInit} from '@angular/core';
import {CompanyService} from '../../../Services/company.service';
import {Company} from '../../../models/Company';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.scss', '../../../../assets/css/style_II.css']
})
export class CompaniesListComponent implements OnInit {
  loadedCompanies: Company[] = [];

  constructor(private companyService: CompanyService) {
  }

  ngOnInit(): void {
    this.loadCompanies();
  }

  private loadCompanies() {
    this.companyService.getAllCompanies().subscribe(companies => {
      this.loadedCompanies = companies;
    })

  }
}
