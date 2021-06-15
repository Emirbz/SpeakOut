import {Injectable} from '@angular/core';
import {apiConfig} from '../config/apiConfig';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {File} from '../models/File';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  fileApi = apiConfig.apis.file;

  constructor(private _http: HttpClient) {
  }

  uploadFile(file: any, userId: string, type: string): Observable<File> {
    const formData = new FormData();
    formData.append('type', type);
    formData.append('directoryName', 'images');
    formData.append('filesToImport', file);
    formData.append('userId', userId);
    return this._http.post<File>(`${environment.storage}/upload`, formData);
  }


}
