import {JobOffer} from './JobOffer';

export class JobApply {
  applyId?: number;
  userId?: string;
  jobId?: number;
  job?: JobOffer;
  applyDate?: string;
  updateDate?: string;
  deletedDate?: string;
  isValid?: boolean;

  constructor() {
  }

}
