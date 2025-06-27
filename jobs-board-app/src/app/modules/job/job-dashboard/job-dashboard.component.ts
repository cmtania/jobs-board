import { Router } from '@angular/router';
import { Observable, OperatorFunction, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize, map, take, tap, timeout } from 'rxjs/operators';
import { Company } from '../../model/company.enum';
import { JobModel } from '../../model//job-model';
import { JobService } from '../../services/job-services';
import { SearchQuery } from '../../interfaces/search-query';
import { Component, Inject, Injector, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { Select, Selector, Store } from '@ngxs/store';
import { HideSpinner, ShowSpinner } from '../../state-management/actions/spinner.action';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CreateJobComponent } from '../create-job-modal/create-job.component';
import { CommonService } from '../../services/common.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JobState } from '../../state-management/states/job.state';

@Component({
  selector: 'job-dashboard',
  templateUrl: './job-dashboard.component.html',
  styleUrls: ['./job-dashboard.component.css']
})
export class JobDashboardComponent implements OnInit {
  @Select(JobState.getJobs) jobs$: Observable<any[]>;

  title = 'remoteJobs';
  jobs: JobModel[] = [];
  suggestions: any[] = [];
  companyName: string[] = [];
  public model: any;
  public subscription: Subscription;
  @ViewChild('closebutton') closebutton: any;
  searchText: string = "";
  searchVariable = ["JobTitle", "JobType", "CompanyName"];
  search: SearchQuery = {
    type: '',
    text: '',
  };
  
  modalConfig = {
    ignoreBackdropClick: true,
    class: "modal-lg"
  };
  jobId: number;

  isJobType: boolean = true;

  bsModalRef?: BsModalRef;
  searchForm: FormGroup;

  private searchFormSubscription: Subscription;

  typeahead: OperatorFunction<string, readonly string[]>;

  private readonly _store: Store;

  constructor(injector: Injector,
    private readonly _router: Router,
    private readonly _modalService: BsModalService,
    private fb: FormBuilder
  ) {
    this._store = injector.get(Store);
    this.searchForm = this.fb.group({
      type: [''],
      text: ['']
    });
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
    this.searchFormSubscription = this.searchForm.valueChanges.subscribe(val => {
      this.search.type = val.type;
      this.search.text = val.text;
      this.searchTypeChange();
    });
  }

  searchTypeChange() {
    if(this.searchForm.value.type) {
      const jobData = this._store.selectSnapshot(JobState.getJobs);
      this.suggestions = _.unionBy(_.map(jobData, this.searchForm.value.type));
      
      return;
    }

    this.searchAll();
  }

  searchAll(): void{
    this.suggestions = [];
    const jobData = this._store.selectSnapshot(JobState.getJobs);
    console.log('jobData', jobData);
    this.searchVariable.forEach(x => {
      let arr = _.unionBy(_.map(jobData, x));
       this.suggestions.push(...arr);
    });
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
    // this._jobService.purgeJob(this.jobId).pipe(
    //   take(1),
    //   tap(() => {
    //      this.closeModal();
    //   }),
    //   finalize(() => {
    //     this.getJobs();
    //     this._store.dispatch(new HideSpinner());
    //   })
    // ).subscribe();
  
  }

  closeModal(): void {
    this.closebutton.nativeElement.click();
  }

  ngOnDestroy(): void {
    if (this.searchFormSubscription) {
      this.searchFormSubscription.unsubscribe();
    }
  }
}
