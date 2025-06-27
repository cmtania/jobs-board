import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Company } from '../../model/company.enum';
import { JobModel } from '../../model/job-model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Store } from '@ngxs/store';
import { AddJob } from '../../state-management/actions/job.action';
import { CommonService } from '../../services/common.service';

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

  createJobForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store,
    public bsModalRef: BsModalRef,
    private readonly commonService: CommonService,
  ) {
    this.createJobForm = this.fb.group({
      JobTitle: ['', [Validators.required]],
      Company: ['', [Validators.required]],
      JobType: ['', [Validators.required]],
      JobDescription: ['', [Validators.required]],
      Salary: [0, [Validators.required, Validators.min(1)]],
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
      CompanyId: parseInt(this.createJobForm.value.Company, 10),
      CompanyName: Company[parseInt(this.createJobForm.value.Company, 10)],
      CompanyLogo: this.commonService.getCompanyLogo(parseInt(this.createJobForm.value.Company, 10)),
      JobType: this.createJobForm.value.JobType,
      JobDescription: this.createJobForm.value.JobDescription,
      Salary: this.createJobForm.value.Salary,
      CreatedBy: 'hradmin',
      CreatedDate: new Date().toISOString(),
      UpdatedBy: '',
      UpdatedDate: '',
      Purge: 'N',
    } as any;

    this.store.dispatch(new AddJob(newJob));
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

  closeModal() {
    this.closebutton.nativeElement.click();
  }

}
