import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Company} from '../models/Company';
import {apiConfig} from '../config/apiConfig';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  companyApi = apiConfig.apis.company;

  constructor(private _http: HttpClient) {
  }

  getAllCompanies(): Observable<Company[]> {
    return this._http.get<Company[]>(this.companyApi);
  }

  getCompanyById(companyId: string): Observable<Company> {
    return this._http.get<Company>(`${this.companyApi}/byId?id?=${companyId}`);
  }

  createCompany(newCompany: Company): Observable<Company> {

    return this._http.post<Company>(`${this.companyApi}/create?companyId=${newCompany.companyId}&business=${newCompany.business}&establishmentDate=${newCompany.establishmentDate}&profileDescription=${newCompany.profileDescription}&isValid=isValid&companyName=${newCompany.companyName}`, {});
  }

  updateCompany(updatedCompany: Company): Observable<Company> {

    return this._http.put<Company>(this.companyApi, updatedCompany);
  }

  deleteCompany(companyId: string): Observable<Company> {

    return this._http.delete<Company>(`${this.companyApi}/byId?id?=${companyId}`);
  }


}
