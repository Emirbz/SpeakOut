import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CompanyService} from '../../../Services/company.service';
import {Router} from '@angular/router';
import {AuthentificationService} from '../../../Services/authentification.service';
import {ToastrService} from 'ngx-toastr';
import {Company} from '../../../models/Company';
import {User} from '../../../models/user';

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.scss', '../../../../assets/css/style_II.css']
})
export class UpdateCompanyComponent implements OnInit {

  @Input() companyToEdit: Company
  companyFormGroup: FormGroup;
  isFormSubmitted: boolean = false;

  @Output() companyUpdatedEvent = new EventEmitter<boolean>();
  @Input() loggedUser: User;
  @Output() updatedCompanyEvent = new EventEmitter<Company>();


  constructor(private formBuilder: FormBuilder,
              private companyService: CompanyService,
              private router: Router,
              private authentificationService: AuthentificationService,
              private authenticationService: AuthentificationService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.companyFormGroupValidate();
  }

  private companyFormGroupValidate() {

    // init formBuilder validators
    this.companyFormGroup = this.formBuilder.group({
      business: ['', Validators.required],
      profileDescription: ['', Validators.required],
      companyName: ['', Validators.required],
      establishmentDate: ['', Validators.required],
      localisation: ['', Validators.required],

    });
    this.patchJobOfferFormValues();

  }

  formError(attribute: string, validator: string) {
    return this.companyFormGroup.get(attribute)?.hasError(validator);
  }


  patchJobOfferFormValues() {
    this.companyFormGroup.patchValue({
      business: this.companyToEdit.business,
      profileDescription: this.companyToEdit.profileDescription,
      companyName: this.companyToEdit.companyName,
      localisation: this.companyToEdit.localisation,
      establishmentDate: this.formatDate(this.companyToEdit.establishmentDate)
    });
  }

  formatDate(date: any) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('-');
  }

  resetForm() {
    this.companyUpdatedEvent.emit(false);

  }


  updateCompany() {

    this.isFormSubmitted = true;

    // check if form is valid
    if (this.companyFormGroup.valid) {

      // get form value and cast is as jobOffer
      const companyToSave = {...this.companyFormGroup.value} as Company;

      // set static user
      companyToSave.userId = this.loggedUser?.id;
      // set random id
      companyToSave.companyId = this.companyToEdit.companyId;

      // set valid to true
      companyToSave.isValid = true;
      // set active to true

      // set company image
      companyToSave.companyUrl = this.companyToEdit.companyUrl;

      // save data to db
      this.companyService.updateCompany(companyToSave).subscribe(() => {
        // on success navigate to job offers list
        this.companyUpdatedEvent.emit(false);
        this.updatedCompanyEvent.emit(companyToSave);
        this.toastr.success('Company updated', 'Your Company have been updated successfully');
      })
    }

  }
}
