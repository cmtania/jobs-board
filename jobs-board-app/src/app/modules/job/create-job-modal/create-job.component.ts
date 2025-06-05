import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, Subscription, take, tap } from 'rxjs';
import { Company } from '../../model/company.enum';
import { JobService } from '../../services/job-services';
import { JobModel } from '../../model/job-model';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css'],
})
export class CreateJobComponent implements OnInit {
  modalTitle: string = 'Create New Job';
  @ViewChild('closebutton') closebutton: any;
  companyList: any;
  isSaving: Boolean = true;
  isSuccessNotif: Boolean = true;
  public subscription: Subscription;

  createJobForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private _jobService: JobService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.createJobForm = this.fb.group({
      JobTitle: ['', [Validators.required]],
      Company: ['', [Validators.required]],
      JobType: ['', [Validators.required]],
      JobDescription: ['', [Validators.required]],
      Salary: [0, [Validators.required, Validators.min(5)]],
    });
  }

  ngOnInit(): void {
    this.getCompany();
  }

  SaveJob(): void {
    this.isSaving = false;
    const newJob: JobModel = {
      JobId: 0,
      JobTitle: this.createJobForm.value.JobTitle,
      CompanyId: this.createJobForm.value.Company,
      JobType: this.createJobForm.value.JobType,
      JobDescription: this.createJobForm.value.JobDescription,
      Salary: this.createJobForm.value.Salary,
      CreatedBy: 'hradmin',
      CreatedDate: '',
      UpdatedBy: '',
      UpdatedDate: '',
      Purge: 'N',
    } as any;

    this._jobService
      .postJob(newJob)
      .pipe(
        take(1),
        finalize(() => {
          this.createJobForm.reset();
        })
      ).subscribe();
  }

  getCompany(): any {
    let enumCompany = Object.keys(Company)
      .map((key: any) => Company[key])
      .filter((k) => !(parseInt(k) >= 0));
    let num = 1;
    let company = [];
    for (const key in enumCompany) {
      company.push({ id: num, value: enumCompany[key] });
      num++;
    }
    return company;
  }

  backtoList(): void {
    this._router.navigateByUrl('/job-dashboard');
  }

  closeModal() {
    this.closebutton.nativeElement.click();
  }

}
