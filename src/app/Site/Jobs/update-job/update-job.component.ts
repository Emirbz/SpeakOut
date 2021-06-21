import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {JobOfferService} from '../../../Services/job-offer.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {JobOffer} from '../../../models/JobOffer';
import {User} from '../../../models/user';
import {CompanyService} from '../../../Services/company.service';
import {Company} from '../../../models/Company';

@Component({
  selector: 'app-update-job',
  templateUrl: './update-job.component.html',
  styleUrls: ['./update-job.component.scss', '../../../../assets/css/style_II.css']
})
export class UpdateJobComponent implements OnInit {
  offerFormGroup: FormGroup;
  isFormSubmitted: boolean = false;
  jobSalary: string[] = [];
  jobCategory: string[] = [];
  jobSalaryError: boolean = false;
  jobCategoryError: boolean = false;
  loadedJobOffer: JobOffer;
  userCompany: Company;
  loggedUser: User;

  constructor(private formBuilder: FormBuilder,
              private jobOfferService: JobOfferService,
              private router: Router,
              private toastr: ToastrService,
              private route: ActivatedRoute,
              private companyService: CompanyService) {
  }

  ngOnInit(): void {
    this.offerFormValidate();
    this.loadSingleJobOffer();
  }


  private loadSingleJobOffer() {
    const id = this.route.snapshot.paramMap.get('id');
    this.jobOfferService.getJobOfferById(id).subscribe(job => {
      this.loadedJobOffer = job;
      this.patchJobOfferFormValues();
    });
  };

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
      jobDescription: ['', Validators.compose([Validators.required, Validators.minLength(50), Validators.maxLength(200)])],
    });

  }

  patchJobOfferFormValues() {

    this.offerFormGroup.patchValue({

      jobDescription: this.loadedJobOffer?.jobDescription,
      localisation: this.loadedJobOffer?.localisation,
      title: this.loadedJobOffer?.title,
    });
  }

  updateOffer() {


    // get user
    const user = JSON.parse(<string>localStorage.getItem('user')) as User;

    // get company id
    const jobId = this.route.snapshot.paramMap.get('id');

    // check whenever default job salary value is still selected

    if (!this.jobCategory.find(item => item === this.offerFormGroup.value.categorie)) {
      this.jobCategoryError = true;
    }
    // check whenever default job category value is still selected
    if (!this.jobSalary.find(item => item === this.offerFormGroup.value.salaire)) {
      this.jobSalaryError = true;
    }

    this.isFormSubmitted = true;

    // check if form is valid
    if (this.offerFormGroup.valid) {

      // get form value and cast is as jobOffer
      const jobOfferToSave = {...this.offerFormGroup.value} as JobOffer;

      // set  user
      jobOfferToSave.userId = user.id as string;
      // set  id
      jobOfferToSave.jobId = jobId as unknown as number;
      // set  company
      jobOfferToSave.companyId = this.loadedJobOffer.companyId;

      // set valid to true
      jobOfferToSave.isValid = true;
      // set active to true
      jobOfferToSave.isActive = true;
      // save data to db
      this.jobOfferService.updateJobOffer(jobOfferToSave).subscribe(() => {
        this.toastr.success('Job update', 'Your job have been updated successfully');
        // on success navigate to job offers list
        this.router.navigate(['/user-profile']);
      })
    } else {
      this.findInvalidControls();
    }

  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.offerFormGroup.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
        console.log(name)
      }
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

  selectedSalary(js: string) {
    if (this.loadedJobOffer) {
      return this.loadedJobOffer.salaire === js;
    }
    return false;


  }

  selectedCategory(js: string) {
    if (this.loadedJobOffer) {
      return this.loadedJobOffer.categorie === js;
    }
    return false;

  }
}
