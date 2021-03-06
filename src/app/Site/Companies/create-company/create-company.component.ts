import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Company} from '../../../models/Company';
import {AuthentificationService} from '../../../Services/authentification.service';
import {User} from '../../../models/user';
import {CompanyService} from '../../../Services/company.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.scss', '../../../../assets/css/style_II.css']
})
export class CreateCompanyComponent implements OnInit {
  companyFormGroup: FormGroup;
  isFormSubmitted: boolean = false;

  @Output() companyUpdatedEvent = new EventEmitter<boolean>();
  @Output() hasCompanyEvent = new EventEmitter<boolean>();
  @Input() loggedUser: User;

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

  createCompany() {

    this.isFormSubmitted = true;

    // check if form is valid
    if (this.companyFormGroup.valid) {

      // get form value and cast is as jobOffer
      const companyToSave = {...this.companyFormGroup.value} as Company;

      // set static user
      companyToSave.userId = this.loggedUser?.id;
      // set random id
      companyToSave.companyId = Math.floor(Math.random() * 145879) + 1;

      // set valid to true
      companyToSave.isValid = true;
      // set active to true

      // set user company

      // save data to db
      this.companyService.createCompany(companyToSave).subscribe(() => {
        // on success navigate to job offers list
        this.companyUpdatedEvent.emit(false);
        this.hasCompanyEvent.emit(true);
        this.toastr.success('Company created', 'Your Company have been created successfully');
        localStorage.setItem('USER_ROLE', 'RECRUITER')

      })
    }

  }

  formError(attribute: string, validator: string) {
    return this.companyFormGroup.get(attribute)?.hasError(validator);
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

  }

  private getLoggedUser() {
    this.authenticationService.getLoggedUser().subscribe(user => {
      if (user.id) {
        this.loggedUser = user;
      }
    });
  }

  resetForm() {
    this.companyUpdatedEvent.emit(false);

  }

}
