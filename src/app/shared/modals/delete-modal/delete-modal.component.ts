import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JobOffer} from '../../../models/JobOffer';
import {CompanyService} from '../../../Services/company.service';
import {JobOfferService} from '../../../Services/job-offer.service';
import {ToastrService} from 'ngx-toastr';
import {Company} from '../../../models/Company';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {

  @Input() module: string;
  @Input() jobOffer: JobOffer;
  @Input() company: Company;
  @Output() deletedEvent = new EventEmitter<boolean>();
  @Output() deletedItemId = new EventEmitter<string>();

  constructor(private jobOfferService: JobOfferService,
              private companyService: CompanyService,
              private toastr: ToastrService
  ) {
    // @ts-ignore

  }

  ngOnInit(): void {
    // @ts-ignore
    $('#delete-modal').appendTo('body')

  }

  closeModal(type: 'JobOffer' | 'Company') {
    type === 'JobOffer' ? this.jobOffer = undefined as any : this.company = undefined as any;

  }

  deleteElement(type: string) {
    type === 'jobOffer' ? this.deleteJobOffer() : this.deleteCompany();

  }

  private deleteJobOffer() {

    this.jobOfferService.deleteJobOffer(this.jobOffer.jobId).subscribe(() => {
      // @ts-ignore
      $('#delete-modal').modal('toggle');
      this.deletedEvent.emit(true);
      this.deletedItemId.emit(this.jobOffer.jobId + '')
      this.toastr.success('Job offer deleted', 'Your job offer have been deleted successfully');
      this.jobOffer = undefined as any;

    });

  }

  private deleteCompany() {
    this.companyService.deleteCompany(this.company.companyId).subscribe(() => {
      // @ts-ignore
      $('#delete-modal').modal('toggle');

      this.deletedEvent.emit(true);
      this.toastr.success('Company  deleted', 'Your Company have been deleted successfully');

      this.deletedItemId.emit(this.company.companyId + '')
      this.company = undefined as any;
    });
  }
}
