import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/model/company.enum';
import { JobModel, NewEditJobModel } from 'src/app/model/job-model';
import { JobService } from '../services/job-services';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css']
})
export class CreateJobComponent implements OnInit {

  modalTitle: string = "Create New Job";
  @ViewChild("createJobForm") createJobForm: NgForm;
  @ViewChild("closebutton") closebutton: any;
  newJobModel: NewEditJobModel;
  modalPrompt: TemplateRef<any>;
  companyList: any;
  isSaving: Boolean = true;
  isSuccessNotif: Boolean = true;

  constructor(private _jobService: JobService,
    private _route: ActivatedRoute,
    private _router: Router) {
    this.newJobModel = new NewEditJobModel();
  }

  ngOnInit(): void {
    this.getCompany();
  }

  Confirm(ConfirmationSave: TemplateRef<any>, PromptToAddRole: TemplateRef<any>) {
    this.modalPrompt = PromptToAddRole;
  }
  SaveJob(): void {
    this.isSaving = false;
    let createdDate = new Date();
    this.newJobModel.CreatedDate = createdDate.toISOString();
    this.newJobModel.CreatedBy = "Admin.Job"
    this.newJobModel.Purge = "N";
    this._jobService.postJob(this.newJobModel).subscribe(() => {

      this.isSaving = true;
      this.isSuccessNotif = false;
      this.closeModal();
      setTimeout(() => {
        this.isSuccessNotif = true;
      }, 2000);

      this.createJobForm.reset();
    },
      err => {
        console.log(err);
        this.isSaving = true;
      })

  }

  getCompany(): any {
    let enumCompany = Object.keys(Company).map(key => Company[key]).filter(k => !(parseInt(k) >= 0));
    //console.log(enumCompany);
    let num = 1;
    let company = [];
    for (const key in enumCompany) {
      company.push({ id: num, value: enumCompany[key] });
      num++;
    }
    return company;
  }

  Decline(): void {
    // this.modalRefChild.hide();
  }
  PromptConfirm() {
    // this.getAllRole();
    // this.modalRefChild1.hide();
  }
  PromptDecline() {
    // this.modalRefChild1.hide();
    // this.BackTolist();
  }

  backtoList(): void {
    this._router.navigateByUrl("/home");
  }

  closeModal() {
    this.closebutton.nativeElement.click();
  }
}
