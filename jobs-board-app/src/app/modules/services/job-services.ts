import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { JobModel } from '../model/job-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class JobService {

  baseUrl: string = environment.httpUrl;

  private _jobpostedApi = `${this.baseUrl}api/job`;

  constructor(private _http: HttpClient) { }

  getJob(jobId: number):Observable<any> {
    return this._http.get(`${this._jobpostedApi}/${jobId}`);
  }

  getJobs() {
    return this._http.get(this._jobpostedApi).pipe(
      catchError((err: any) => throwError(() => err)));
  }

  postJob(job: JobModel) {
    return this._http.post(this._jobpostedApi, job).pipe(
      catchError((err: any) => throwError(() => err)));
  }

  putJob(job: JobModel) {
    return this._http.put(this._jobpostedApi + "/" + job.JobId, job).pipe(
      catchError((err: any) => throwError(() => err)));
  }

  purgeJob(jobId: number) {
    return this._http.delete(this._jobpostedApi + "/" + jobId).pipe(
      catchError((err: any) => throwError(() => err)));
  }
}
