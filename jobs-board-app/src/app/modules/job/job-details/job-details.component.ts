import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, Subscription, take, tap } from 'rxjs';
import { JobModel } from '../../model/job-model';
import { Company } from '../../model/company.enum';
import { JobService } from '../../services/job-services';
import { Store } from '@ngxs/store';
import { HideSpinner, ShowSpinner } from '../../state-management/actions/spinner.action';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

  job: JobModel;
  isUpdating: Boolean = true;
  hideJd: boolean = false;
  isLoading: boolean = true;
  isSuccessNotif: boolean = true;
  jobId: number;
  pageTitle: string = "Job Details";
  jobDescription: string = "";
  @ViewChild('closebutton') closebutton: any;

  public subscription: Subscription;

  private readonly _store: Store;

  constructor(
    injector: Injector,
    private _jobService: JobService,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _commonService: CommonService) {
      this._store = injector.get(Store);

      this.job = new JobModel();
      this.jobId = this._route.snapshot.params.id;
     }

  ngOnInit(): void {
    this.getJob();
    let date = new Date();
    console.log(date,"date now");
    console.log(date.toISOString())
  }

  getJob(){
    this._store.dispatch(new ShowSpinner());
    // this._jobService.getJob(this.jobId).pipe(
    //   take(1),
    //   tap((resp: any) => {
    //      this.job = resp;
    //      this.job.CompanyLogo = this._commonService.getCompanyLogo(this.job.CompanyId);
    //   }),
    //   finalize(() => {
    //     this._store.dispatch(new HideSpinner());
    //   })
    // ).subscribe();
  }

  updateJob(): void{
    this.isLoading = false;
    this.isUpdating = true;
    this.isSuccessNotif = true;
    this.job.JobDescription = this.jobDescription;
    // this._jobService.putJob(this.job).pipe(
    // take(1),
    // tap(() => {
    //   this.isSuccessNotif = false;
    //   this.getJob();
    //   this.hideJd = false;
    //   this.isLoading = true;
     
    // }),
    // finalize(() => {
    //   this.closeModal();

    //     setTimeout(() =>{
    //     this.isSuccessNotif = true;
    //   }, 2000);
    // })).subscribe();
}

resetSubscription(): void{
  if (this.subscription){
    this.subscription.unsubscribe();
  };
}
  getCompanyName(companyId: number): string{
    return Company[companyId];
  }

  editJD():void{
    this.hideJd = true;
    this.isUpdating = false;
    this.jobDescription = this.job.JobDescription;
  }

  backtoList():void{
    this._router.navigateByUrl("/job-dashboard");
  }

  closeModal():void{
    this.closebutton.nativeElement.click();
  }
}


