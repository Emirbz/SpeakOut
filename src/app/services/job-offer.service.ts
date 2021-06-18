import {Injectable} from '@angular/core';
import {apiConfig} from '../config/apiConfig';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JobOffer} from '../models/JobOffer';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobOfferService {

  jobOfferApi = apiConfig.apis.jobOffer;

  constructor(private _http: HttpClient) {
  }

    getAllJobOffers(title: string | null): Observable<JobOffer[]> {
      const url = title != null ? `${environment.apiUrl}/JobOfferByTitle?title=${title}` : this.jobOfferApi;

      return this._http.get<JobOffer[]>(url);
  }

  getJobOfferById(jobOfferId: string | null): Observable<JobOffer> {
    return this._http.get<JobOffer>(`${this.jobOfferApi}/byId?id=${jobOfferId}`);
  }


  getJobOfferByUserId(userId: string | undefined): Observable<JobOffer[]> {
    return this._http.get<JobOffer[]>(`${this.jobOfferApi}/byUserId?id=${userId}`);
  }

  createJobOffer(newJobOffer: JobOffer): Observable<JobOffer> {
    return this._http.post<JobOffer>(`${this.jobOfferApi}/create?title=${newJobOffer.title}&localisation=${newJobOffer.localisation}&salaire=${newJobOffer.salaire}&userId=${newJobOffer.userId}&jobId=${newJobOffer.jobId}&categorie=${newJobOffer.categorie}&jobDescription=${newJobOffer.jobDescription}&companyId=${newJobOffer.companyId}&isValid=true`, {});
  }

    updateJobOffer(updatedJobOffer: JobOffer): Observable<JobOffer> {

    return this._http.put<JobOffer>(`${this.jobOfferApi}/update?title=${updatedJobOffer.title}&localisation=${updatedJobOffer.localisation}&salaire=${updatedJobOffer.salaire}&userId=${updatedJobOffer.userId}&jobId=${updatedJobOffer.jobId}&categorie=${updatedJobOffer.categorie}&jobDescription=${updatedJobOffer.jobDescription}&companyId=${updatedJobOffer.companyId}&isValid=true`, {});
  }

  deleteJobOffer(jobOfferId: number | undefined): Observable<JobOffer> {

    return this._http.delete<JobOffer>(`${this.jobOfferApi}/deleteJobOffer?jobId=${jobOfferId}`);
  }
}
