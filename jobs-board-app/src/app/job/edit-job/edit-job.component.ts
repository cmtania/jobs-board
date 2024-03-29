import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { JobModel } from '../../model/job-model';
import { Company } from '../../model/company.enum';
import { JobService } from '../../services/job-services';
import { join } from 'lodash';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css']
})
export class EditJobComponent implements OnInit {

  editJobVm: JobModel;
  isUpdating: Boolean = true;
  jobId: number;
  isSuccessNotif: Boolean = true;
  public subscription: Subscription;


  @ViewChild('editJobForm') editJobForm!: NgForm;
  @ViewChild('closebutton') closebutton: any;
  
  constructor(private _jobService: JobService,
    private _spinner: NgxSpinnerService,
    private _route: ActivatedRoute,
    private _router: Router,) {
      this.editJobVm = new JobModel();
      this.jobId = this._route.snapshot.params.id;
     }

  ngOnInit(): void {
    this.getJob();
  }

  getJob(){
    this._spinner.show();
    this.unsubscription();
    this.subscription = this._jobService.getJob(this.jobId)
    .subscribe({
      next: (data: JobModel) => {
        this.editJobVm = data;
        this._spinner.hide();
      },
      error: (err) => {
        console.log(err);
        this._spinner.hide();
        this._router.navigateByUrl("not-found");
      }
    });
  }

  updateJob(){
    this.isUpdating = false;
    this.unsubscription();
    this.subscription = this._jobService.putJob(this.editJobVm).subscribe(() => {
        console.log("Saved.");
        this.isUpdating =true;
        this.editJobForm.reset();
        this.backtoList();
        this.closeModal();
      },
        (      err: any) => { console.log(err);
              this.isUpdating =true;
      })
  }

  getCompany(): any {
    let enumCompany = Object.keys(Company).map((key: any) => Company[key]).filter(k => !(parseInt(k) >= 0));
    //console.log(enumCompany);
    let num = 1;
    let res = [];
    for (const key in enumCompany) {
      res.push({ id: num, value: enumCompany[key]});
      num++;
    }

    return res;
  }

  closeModal(){
    this.closebutton.nativeElement.click();
  }

  backtoList(){
    this._router.navigateByUrl("/job-dashboard");
  }

  unsubscription(): void{
    this.subscription?.unsubscribe();
  }

}
