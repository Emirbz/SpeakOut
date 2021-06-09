import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss', '../../../../assets/css/style_II.css']
})
export class CreateOfferComponent implements OnInit {
  offerFormGroup: FormGroup;
  isFormSubmitted: boolean = false;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.offerFormValidate();
  }

  offerFormValidate() {
    this.offerFormGroup = this.formBuilder.group({
      title: ['', Validators.required],

    });

  }


  createOffer() {
    this.isFormSubmitted = true;
    if (this.offerFormGroup.valid) {

      console.log('success')
    } else {
      console.log('erreur')
    }

  }

  formError(attribute: string, validator: string) {
    return this.offerFormGroup.get(attribute)?.hasError(validator);
  }
}
