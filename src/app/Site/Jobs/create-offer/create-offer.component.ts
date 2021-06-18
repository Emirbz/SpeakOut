import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {JobOfferService} from '../../../Services/job-offer.service';
import {JobOffer} from '../../../models/JobOffer';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {User} from '../../../models/user';
import {Company} from '../../../models/Company';
import {CompanyService} from '../../../Services/company.service';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss', '../../../../assets/css/style_II.css']
})
export class CreateOfferComponent implements OnInit {
  offerFormGroup: FormGroup;
  isFormSubmitted: boolean = false;
  jobSalary: string[] = [];
  jobCategory: string[] = [];
  jobSalaryError: boolean = false;
  jobCategoryError: boolean = false;
  loggedUser: User;
  userCompany: Company;

  constructor(private formBuilder: FormBuilder,
              private companyService: CompanyService,
              private jobOfferService: JobOfferService,
              private router: Router,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.offerFormValidate();
    this.getUserCompany();
  }

  getUserCompany() {
    const user = JSON.parse(<string>localStorage.getItem('user')) as User;
    this.companyService.getCompanyByUserId(user.id).subscribe(company => {
      if (company.companyId && company.companyId > 0 && company.isValid) {
        // if user has already a company create offer is displayed
        this.userCompany = company;

      }
    })

  }

  offerFormValidate() {

    // job salary static attributes
    this.jobSalary = ['Job Salary', '10K DT - 14K DT', 'DT 14K DT - 18K DT', 'DT 18K DT - 22k DT', '22K DT - 30K DT', '+30K DT'];

    // job job category static attributes
    this.jobCategory = ['Job Category', 'Graphic Designer', 'Engineering Jobs', 'Mainframe Jobs', 'Legal jobs', 'IT Jobs ', 'R&D Jobs', 'Government Jobs', 'PSU Jobs'];

    // init formBuilder validators
    this.offerFormGroup = this.formBuilder.group({
      title: ['', Validators.required],
      localisation: ['', Validators.required],
      salaire: [this.jobSalary, Validators.required],
      categorie: [this.jobCategory, Validators.required],
      jobDescription: ['', Validators.compose([Validators.required, Validators.minLength(50)])],
    });

  }

  createOffer() {
    const user = JSON.parse(<string>localStorage.getItem('user')) as User;
    // check whenever default job salary value is still selected
    if (this.offerFormGroup.value.salaire instanceof Array) {
      this.jobSalaryError = true;
    }
    // check whenever default job category value is still selected
    if (this.offerFormGroup.value.categorie instanceof Array) {
      this.jobCategoryError = true;
    }

    this.isFormSubmitted = true;

    // check if form is valid
    if (this.offerFormGroup.valid
      && !(this.offerFormGroup.value.salaire instanceof Array
        && !(this.offerFormGroup.value.categorie instanceof Array))) {

      // get form value and cast is as jobOffer
      const jobOfferToSave = {...this.offerFormGroup.value} as JobOffer;

      // set static user
      jobOfferToSave.userId = user.id as string;
      // set random id
      jobOfferToSave.jobId = Math.floor(Math.random() * 145879) + 1;
      // set static company
      jobOfferToSave.companyId = this.userCompany.companyId as number;

      // set valid to true
      jobOfferToSave.isValid = true;
      // set active to true
      jobOfferToSave.isActive = true;
      // save data to db
      this.jobOfferService.createJobOffer(jobOfferToSave).subscribe(() => {
        this.toastr.success('Job created', 'Your job have been created successfully');
        // on success navigate to job offers list
        this.router.navigate(['/jobs']);
      })
    }

  }

  formError(attribute: string, validator: string) {
    return this.offerFormGroup.get(attribute)?.hasError(validator);
  }

  resetSelect(attribute: 'SALARY' | 'CATEGORY') {
    // reset error box status if select value has been changed
    switch (attribute) {
      case 'CATEGORY':
        this.jobCategoryError = false;
        break;
      case 'SALARY':
        this.jobSalaryError = false;
        break;
    }
  }
}
