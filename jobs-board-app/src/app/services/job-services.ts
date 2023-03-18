import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { JobModel } from '../model/job-model';
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
    return this._http.get(this._jobpostedApi);
  }

  postJob(job: JobModel) {
    return this._http.post(this._jobpostedApi, job);
  }

  putJob(job: JobModel) {
    return this._http.put(this._jobpostedApi + "/" + job.JobId, job);
  }

  purgeJob(jobId: number) {
    return this._http.delete(this._jobpostedApi + "/" + jobId);
  }

  private handleError(err: any): void{
    console.log(err);
    throw Error(err);
  }
}
