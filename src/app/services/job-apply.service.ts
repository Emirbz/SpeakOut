import {Injectable} from '@angular/core';
import {apiConfig} from '../config/apiConfig';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JobApply} from '../models/JobApply';

@Injectable({
  providedIn: 'root'
})
export class JobApplyService {

  jobApplyApi = apiConfig.apis.jobApply;

  constructor(private _http: HttpClient) {
  }

  getAllJobApplies(): Observable<JobApply[]> {
    return this._http.get<JobApply[]>(this.jobApplyApi);
  }

  getJobApplyById(jobOfferId: string): Observable<JobApply> {
    return this._http.get<JobApply>(`${this.jobApplyApi}/byId?id?=${jobOfferId}`);
  }

  createJobApply(newJobApply: JobApply): Observable<JobApply> {

    return this._http.post<JobApply>(this.jobApplyApi, newJobApply);
  }

  updateJobApply(updatedJobApply: JobApply): Observable<JobApply> {

    return this._http.put<JobApply>(this.jobApplyApi, updatedJobApply);
  }

  deleteJobApply(jobOfferId: string): Observable<JobApply> {

    return this._http.delete<JobApply>(`${this.jobApplyApi}/byId?id?=${jobOfferId}`);
  }
}