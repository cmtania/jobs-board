import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { JobModel } from '../model/job-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class JobService {

  constructor(private _http: HttpClient) { }

 getInitialData():Observable<any> {
    return this._http.get(`assets/main-data.json`);
  }

}
