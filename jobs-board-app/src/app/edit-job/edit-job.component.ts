import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NewEditJobModel } from 'src/app/model/job-model';
import { JobService } from 'src/app/services/job-services';
import { Company } from '../model/company.enum';


@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css']
})
export class EditJobComponent implements OnInit {

  editJobVm: NewEditJobModel;
  isUpdating: Boolean = true;
  jobId: number;
  isSuccessNotif: Boolean = true;


  @ViewChild("editJobForm") editJobForm!: NgForm;
  @ViewChild("closebutton") closebutton: any;

  constructor(private _jobService: JobService,
    private _spinner: NgxSpinnerService,
    private _route: ActivatedRoute,
    private _router: Router,) {
    this.editJobVm = new NewEditJobModel();
    this.jobId = this._route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.getJob();
  }

  getJob() {
    this._spinner.show();
    this._jobService.getJob(this.jobId).subscribe(data => {
      this.editJobVm = data;
      this._spinner.hide();
    }, err => {
      console.log(err);
      this._spinner.hide();
    })
  }

  updateJob() {
    this.isUpdating = false;
    let createdDate = new Date();
    this.editJobVm.UpdatedDate = createdDate.toISOString();
    this.editJobVm.UpdatedDate = "Admin.Job"
    this._jobService.putJob(this.editJobVm).subscribe(() => {
      console.log("Saved.");
      this.isUpdating = true;
      this.editJobForm.reset();
      this.backtoList();
      this.closeModal();
    },
      err => {
        console.log(err);
        this.isUpdating = true;
      })
  }

  getCompany(): any {
    let enumCompany = Object.keys(Company).map(key => Company[key]).filter(k => !(parseInt(k) >= 0));
    //console.log(enumCompany);
    let num = 1;
    let res = [];
    for (const key in enumCompany) {
      res.push({ id: num, value: enumCompany[key] });
      num++;
    }

    return res;
  }

  closeModal() {
    this.closebutton.nativeElement.click();
  }

  backtoList() {
    this._router.navigateByUrl("/home");
  }

}
