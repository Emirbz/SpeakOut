import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Company} from '../../../models/Company';
import {AuthentificationService} from '../../../Services/authentification.service';
import {User} from '../../../models/user';
import {CompanyService} from '../../../Services/company.service';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.scss', '../../../../assets/css/style_II.css']
})
export class CreateCompanyComponent implements OnInit {
  companyFormGroup: FormGroup;
  isFormSubmitted: boolean = false;
  loggedUser: User;

  constructor(private formBuilder: FormBuilder,
              private companyService: CompanyService,
              private router: Router,
              private authenticationService: AuthentificationService) {
  }

  ngOnInit(): void {
    this.companyFormGroupValidate();
    this.getLoggedUser();
  }

  createCompany() {

    this.isFormSubmitted = true;

    // check if form is valid
    if (this.companyFormGroup.valid) {

      // get form value and cast is as jobOffer
      const companyToSave = {...this.companyFormGroup.value} as Company;

      // set static user
      // companyToSave.userId = this.loggedUser?.id;
      // set random id
      companyToSave.companyId = Math.floor(Math.random() * 145879) + 1;

      // set valid to true
      companyToSave.isValid = true;
      // set active to true

      // save data to db
      this.companyService.createCompany(companyToSave).subscribe(() => {
        // on success navigate to job offers list
        this.router.navigate(['/user-profile']);
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

    });

  }

  private getLoggedUser() {
    this.authenticationService.getLoggedUser().subscribe(user => {
      if (user.id) {
        this.loggedUser = user;
      }
    });
  }
}
