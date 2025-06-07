
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, OperatorFunction, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize, map, take, tap, timeout } from 'rxjs/operators';
import { Company } from '../../model/company.enum';
import { JobModel } from '../../model//job-model';
import { JobService } from '../../services/job-services';
import { SearchQuery } from '../../interfaces/search-query';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { Store } from '@ngxs/store';
import { HideSpinner, ShowSpinner } from '../../state-management/actions/spinner.action';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CreateJobComponent } from '../create-job-modal/create-job.component';

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

  bsModalRef?: BsModalRef;
  

  typeahead: OperatorFunction<string, readonly string[]>;

  constructor(
    private _jobService: JobService,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _store: Store,
    private readonly _modalService: BsModalService) {
      this.typeahead = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map((term) =>
          term.length < 2
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
    if(this.search.type){
      this.suggestions = _.unionBy(_.map(this.jobs, this.search.type)); 
      
      return;
    }

    this.searchAll();
  }

  getJobs() {
    this._store.dispatch(new ShowSpinner());
    this._jobService.getJobs().pipe(
      take(1),
      tap((resp: any) => {
         this.jobs = resp;
      }),
      finalize(() => {
         this.jobs.map((x) => {
          return x.CompanyName = this.getCompanyName(x.CompanyId),
            x.CompanyLogo = this.getCompanyLogo(x.CompanyId);
        });
        this.searchAll();   
        this._store.dispatch(new HideSpinner());
      })
    ).subscribe();
  }

  searchAll(): void{
    this.searchVariable.forEach(x => {
      let arr = _.unionBy(_.map(this.jobs, x));
       this.suggestions.push(...arr);
    });
  }


  getCompanyName(companyId: number): string {
    return Company[companyId];
  }

  getCompanyLogo(companyId: number): string {
    return Company[companyId].toLowerCase();
  }

  openCreateJobModal() {
    const initialState: ModalOptions = {
      initialState: {
        title: "Create Job",
      },
      backdrop: 'static',
      keyboard: false,
    };
    this.bsModalRef = this._modalService.show(
      CreateJobComponent,
      initialState
    );
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

  gotoEdit(jobId: number): void {
    console.log(jobId);
    this._router.navigateByUrl("/edit-job/" + jobId);
  }

  gotoView(jobId: number) {
    console.log(jobId);
    this._router.navigateByUrl("/view-job/" + jobId);
  }

  getJobId(jobId: number): void {
    this.jobId = jobId;
  }

  purgeJob(): void {
   this._store.dispatch(new ShowSpinner());

    this.unsubscribe();

    this._jobService.purgeJob(this.jobId).pipe(
      take(1),
      tap(() => {
         this.closeModal();
      }),
      finalize(() => {
        this.getJobs();
        this._store.dispatch(new HideSpinner());
      })
    ).subscribe();
  
  }

  closeModal(): void {
    this.closebutton.nativeElement.click();
  }

  unsubscribe(): void{
    this.subscription?.unsubscribe();
  }

}
