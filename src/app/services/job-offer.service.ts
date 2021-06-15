import {Injectable} from '@angular/core';
import {apiConfig} from '../config/apiConfig';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JobOffer} from '../models/JobOffer';

@Injectable({
  providedIn: 'root'
})
export class JobOfferService {

  jobOfferApi = apiConfig.apis.jobOffer;

  constructor(private _http: HttpClient) {
  }

  getAllJobOffers(): Observable<JobOffer[]> {
    return this._http.get<JobOffer[]>(this.jobOfferApi);
  }

  getJobOfferById(jobOfferId: string | null): Observable<JobOffer> {
    return this._http.get<JobOffer>(`${this.jobOfferApi}/byId?id=${jobOfferId}`);
  }


  getJobOfferByUserId(userId: string | undefined): Observable<JobOffer[]> {
    return this._http.get<JobOffer[]>(`${this.jobOfferApi}/byUserId?id=${userId}`);
  }

  createJobOffer(newJobOffer: JobOffer): Observable<JobOffer> {
    return this._http.post<JobOffer>(`${this.jobOfferApi}/create?title=${newJobOffer.title}&localisation=${newJobOffer.localisation}&salaire=${newJobOffer.salaire}&userId=${newJobOffer.userId}&jobId=${newJobOffer.jobId}&categorie=${newJobOffer.categorie}&jobDescription=${newJobOffer.jobDescription}&`, {});
  }

  updateJobOffer(updatedJobOffer: JobOffer): Observable<JobOffer> {

    return this._http.put<JobOffer>(this.jobOfferApi, updatedJobOffer);
  }

  deleteJobOffer(jobOfferId: string): Observable<JobOffer> {

    return this._http.delete<JobOffer>(`${this.jobOfferApi}/byId?id=${jobOfferId}`);
  }
}
