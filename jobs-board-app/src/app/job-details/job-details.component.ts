import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { Company } from 'src/app/model/company.enum';
import { NewEditJobModel } from 'src/app/model/job-model';
import { JobService } from 'src/app/services/job-services';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

  job: NewEditJobModel;
  isUpdating: Boolean = true;
  hideJd: boolean = false;
  isLoading: boolean = true;
  isSuccessNotif: boolean = true;
  jobId: number;
  pageTitle: string = "Job Details";
  jobDescription: string = "";
  @ViewChild('closebutton') closebutton: any;
  
  constructor(private _jobService: JobService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _spinner: NgxSpinnerService) {
      this.job = new NewEditJobModel();
      this.jobId = this._route.snapshot.params.id;
     }

  ngOnInit(): void {
    this.getJob();
    let datee = new Date();
    console.log(datee,"date now");
    console.log(datee.toISOString())
  }

  getJob(){
    this._spinner.show();
    this._jobService.getJob(this.jobId).subscribe( data =>{
      this.job = data;
      this._spinner.hide();
    },err => {
      console.log(err);
      this._spinner.hide();
      this._router.navigateByUrl("not-found");
    })
  }

  updateJob(){
    this.isLoading = false;
    this.isUpdating = true;
    this.isSuccessNotif = true;
    let createdDate = new Date();
    this.job.UpdatedDate = createdDate.toISOString();
    this.job.UpdatedDate = "Admin.Job"
    this.job.JobDescription = this.jobDescription;
    this._jobService.putJob(this.job).subscribe(() => {
      console.log("Saved.");
      this.isSuccessNotif = false;
      this.getJob();
      this.hideJd = false;
      this.isLoading = true;
      this.closeModal();

      setTimeout(() =>{
        this.isSuccessNotif = true;
      }, 2000);
    },
    err => {
      console.log(err);
      this.closeModal();
    })
}


  getCompanyName(companyId: number): string{
    return Company[companyId];
  }

  editJD(){
    this.hideJd = true;
    this.isUpdating = false;
    this.jobDescription = this.job.JobDescription;
  }

  backtoList(){
    this._router.navigateByUrl("/home");
  }

  closeModal(){
    this.closebutton.nativeElement.click();
  }
}


