import {Company} from './Company';

export class JobOffer {
  jobId: number;
  userId: string;
  jobTypeId: number;
  companyId: number;
  localisation: string;
  title: string;
  salaire: string;
  categorie: string;
  company: Company;
  createdDate: string;
  jobDescription: string;
  isActive: boolean;
  isValid: boolean;
  jobLocationId: number;


  constructor() {
  }


}
