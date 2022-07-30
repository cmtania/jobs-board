import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { NewEditJobModel } from 'src/app/model/job-model';
import { ApplicantModel } from '../model/applicant.model';

@Injectable()
export class ApplicantService {

  baseUrl = environment.httpUrl;

  private _applicantApi = this.baseUrl + 'api/applicant';

  constructor(private _http: HttpClient) { }

  // getJob(jobId: number) {
  //   return this._http.get(this._applicantApi + "/" + jobId).pipe(map((data: any) => {
  //     return data;
  //   }))
  // }

  // getJobs() {
  //   return this._http.get(this._applicantApi).pipe(map((data: any) => {
  //     return data;
  //   }))
  // }

  postApplicant(applicant: ApplicantModel) {
    return this._http.post(this._applicantApi, applicant);
  }

  // putJob(job: NewEditJobModel) {
  //   return this._http.put(this._applicantApi + "/" + job.JobId, job);
  // }

  // purgeJob(jobId: number) {
  //   return this._http.delete(this._applicantApi + "/" + jobId);
  // }
}
