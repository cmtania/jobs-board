import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { NewEditJobModel } from 'src/app/model/job-model';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  baseUrl = environment.httpUrl;

  private _jobpostedApi = this.baseUrl + "api/job";

  constructor(private _http: HttpClient) { }

  getJob(jobId: number) {
    return this._http.get(this._jobpostedApi + "/" + jobId).pipe(map((data: any) => {
      return data;
    }))
  }

  getJobs() {
    return this._http.get(this._jobpostedApi).pipe(map((data: any) => {
      return data;
    }))
  }

  postJob(job: NewEditJobModel) {
    return this._http.post(this._jobpostedApi, job);
  }

  putJob(job: NewEditJobModel) {
    return this._http.put(this._jobpostedApi + "/" + job.JobId, job);
  }

  purgeJob(jobId: number) {
    return this._http.delete(this._jobpostedApi + "/" + jobId);
  }
}
