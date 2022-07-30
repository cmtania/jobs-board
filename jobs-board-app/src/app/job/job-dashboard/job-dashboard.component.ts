import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, OperatorFunction, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, timeout } from 'rxjs/operators';
import { Company } from 'src/app/model/company.enum';
import { JobModel } from 'src/app/model/job-model';
import { JobService } from 'src/app/services/job.service';
import * as _ from 'lodash';
import { SearchQuery } from 'src/app/interfaces/search-query';

@Component({
  selector: 'job-dashboard',
  templateUrl: './job-dashboard.component.html',
  styleUrls: ['./job-dashboard.component.css']
})
export class JobDashboardComponent implements OnInit {
  title = 'remoteJobs';
  jobs: JobModel[] = [];
  suggestions: any[] = [];
  companyName: string[] = [];
  public model: any;
  public subscription: Subscription;
  @ViewChild('closebutton') closebutton: any;
  searchText: string = "";
  searchChangeText: string = "";
  searchVariable = ["JobTitle", "JobType", "CompanyName"];
  
  modalConfig = {
    ignoreBackdropClick: true,
    class: "modal-lg"
  };
  jobId: number;

  isJobType: boolean = true;

  search: SearchQuery = {
    type: '',
    text: '',
  };
  

  typeahead: OperatorFunction<string, readonly string[]>;

  constructor(private _jobService: JobService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _spinner: NgxSpinnerService) {
      this.typeahead = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map((term) =>
          term.length < 3
            ? []
            : this.suggestions
                .filter((v: any) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
                .slice(0, 10)
        )
      );

     }

  ngOnInit(): void {
    this.getJobs();
  }

  searchTypeChange() {
    if(!this.search.type){
      this.searchAll();
    } else {
      this.suggestions = _.unionBy(_.map(this.jobs, this.search.type)); 
    }
  }

  getJobs() {
    this._spinner.show();
    this.resetSubscription();
    this.subscription = this._jobService.getJobs().subscribe(res => {
        //console.log(res);
        this.jobs = res.sort((a: any, b: any) => b.JobId - a.JobId);;
        this._spinner.hide();
      }, err => {
        console.log(err);
        this._spinner.hide();
      },()=>{
        this.jobs.forEach(x => {
           x.CompanyName = this.getCompanyName(x.CompanyId);
         });
         this.searchAll();
      })

  }

  searchAll(){
    this.searchVariable.forEach(x => {
      let arr = _.unionBy(_.map(this.jobs, x));
       this.suggestions.push(...arr);
    });
  }


  getCompanyName(companyId: number): string {
    return Company[companyId];
  }

  getCompanyLogo(companyId: number): string {
    return Company[companyId].toLocaleLowerCase();
  }

  gotoCreateJob():void {
    this._router.navigate(['create-job']);
  }

  gotoRegister() {
    this._router.navigate(['register']);
  }

  getPercentage(totApplied: string, capacity: string) {
    return ((+totApplied / +capacity) * 100) + '%';
  }

  getColor(totApplied: string, capacity: string) {
    let actual = (+totApplied / +capacity) * 100;

    if (actual <= 20) {
      return "red"
    } else if (actual >= 21 && actual <= 50) {
      return "orange"
    } else if (actual >= 51 && actual <= 100) {
      return "green"
    }
    return "white"
  }

  gotoEdit(jobId: number) {
    console.log(jobId);
    this._router.navigateByUrl("/edit-job/" + jobId);
  }

  gotoView(jobId: number) {
    console.log(jobId);
    this._router.navigateByUrl("/view-job/" + jobId);
  }

  getJobId(jobId: number) {
    this.jobId = jobId;
  }

  purgeJob() {
    this._spinner.show();

    this.resetSubscription();

    this.subscription = this._jobService.purgeJob(this.jobId).subscribe(() => {
      this.closeModal();
      this.getJobs();
      this.closeModal();
      this._spinner.hide();
    }, err => {
      console.log(err);
      this._spinner.hide();
    })
  }

  closeModal() {
    this.closebutton.nativeElement.click();
  }

  resetSubscription(): void{
    if (this.subscription){
      this.subscription.unsubscribe();
    };
  }

}
