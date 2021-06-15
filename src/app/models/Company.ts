import {JobOffer} from './JobOffer';

export class Company {
  companyId?: number;
  companyName?: string;
  profileDescription?: string;
  business?: string;
  companyUrl?: string;
  establishmentDate?: string;
  localisation?: string;
  isValid?: boolean;
  userId?: string;
  jobOffer?: JobOffer[];


  constructor() {
  }

}
