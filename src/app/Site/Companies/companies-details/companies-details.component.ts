import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Company} from '../../../models/Company';
import {CompanyService} from '../../../Services/company.service';

@Component({
  selector: 'app-companies-details',
  templateUrl: './companies-details.component.html',
  styleUrls: ['./companies-details.component.scss', '../../../../assets/css/style_II.css']
})
export class CompaniesDetailsComponent implements OnInit {

  loadedCompany: Company;

  constructor(private companyService: CompanyService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loadSingleCompany();
  }

  private loadSingleCompany() {
    const id = this.route.snapshot.paramMap.get('id');
    this.companyService.getCompanyById(id).subscribe(c => {
      this.loadedCompany = c;
    });
  };


}
