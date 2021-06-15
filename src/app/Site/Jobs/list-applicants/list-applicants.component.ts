import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../models/user';

@Component({
  selector: 'app-list-applicants',
  templateUrl: './list-applicants.component.html',
  styleUrls: ['./list-applicants.component.scss', '../../../../assets/css/style_II.css']
})
export class ListApplicantsComponent implements OnInit {
  @Input() listCandidates: User [];
  @Output() closeEvent = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  close() {
    this.closeEvent.emit(false);

  }
}
