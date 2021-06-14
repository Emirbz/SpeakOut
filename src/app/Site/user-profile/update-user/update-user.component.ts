import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../models/user';
import {AuthentificationService} from '../../../Services/authentification.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss', '../../../../assets/css/style_II.css']
})
export class UpdateUserComponent implements OnInit {

  userFormGroup: FormGroup;
  civility: string[] = [];
  isFormSubmitted: boolean = false;
  civilityError: boolean = false;
  @Output() userUpdatedEvent = new EventEmitter<boolean>();
  @Input() loggedUser: User;

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthentificationService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.userFormValidate();
  }

  formError(attribute: string, validator: string) {
    return this.userFormGroup.get(attribute)?.hasError(validator);
  }

  resetCivilitySelect() {
    // reset error box status if select value has been changed
    this.civilityError = false;
  }

  updateUser() {
    // check whenever default job salary value is still selected
    if (this.userFormGroup.value.civility instanceof Array) {
      this.civilityError = true;
    }

    this.isFormSubmitted = true;

    // check if form is valid
    if (this.userFormGroup.valid && !(this.userFormGroup.value.civility instanceof Array)) {

      // get form value and cast is as jobOffer
      const userToUpdate = {...this.userFormGroup.value} as User;

      // set user id
      userToUpdate.id = this.loggedUser.id;
      // set photo url
      userToUpdate.photoUrl = JSON.parse(<string>localStorage.getItem('user')).photoUrl;

      // set photo url
      userToUpdate.email = JSON.parse(<string>localStorage.getItem('user')).email;
      // set valid to true
      userToUpdate.isValid = true;
      // set active to true
      userToUpdate.isActive = true;
      // save data to db
      this.authenticationService.updateUser(userToUpdate).subscribe(() => {
        // on success navigate to job offers list
        this.userUpdatedEvent.emit(false)
        // update stored user
        this.authenticationService.setLoggedUser(userToUpdate);
        localStorage.setItem('user', JSON.stringify(userToUpdate));
        this.toastr.success('User updated', 'Your profile  has updated successfully');
      }, error => {
        console.log(error)
      })
    }

  }

  patchUserFormValues() {
    this.userFormGroup.patchValue({
      dateOfBirth: this.formatDate(this.loggedUser?.dateOfBirth),
      adresse: this.loggedUser?.adresse,
      city: this.loggedUser?.city,
      civility: this.loggedUser?.civility,
      country: this.loggedUser?.country,
      aboutMe: this.loggedUser?.aboutMe,
      firstName: this.loggedUser?.firstName,
      lastName: this.loggedUser?.lastName,
      phoneNumber: this.loggedUser?.phoneNumber
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

  private userFormValidate() {
    // civility static attributes
    this.civility = ['Civility', 'Mr', 'Mrs'];

    // init formBuilder validators
    this.userFormGroup = this.formBuilder.group({
      dateOfBirth: ['', Validators.required],
      adresse: ['', Validators.required],
      city: ['', Validators.required],
      civility: [this.civility, Validators.required],
      country: ['', Validators.required],
      aboutMe: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
    this.patchUserFormValues();
  }

  resetForm() {
    this.userUpdatedEvent.emit(false);

  }
}
