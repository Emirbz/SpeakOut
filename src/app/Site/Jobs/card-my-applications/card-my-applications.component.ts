import {Component, Input, OnInit} from '@angular/core';
import {JobApply} from '../../../models/JobApply';

@Component({
  selector: 'app-card-my-applications',
  templateUrl: './card-my-applications.component.html',
  styleUrls: ['./card-my-applications.component.scss']
})
export class CardMyApplicationsComponent implements OnInit {
  @Input() jobApply: JobApply;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.jobApply)
  }

}
