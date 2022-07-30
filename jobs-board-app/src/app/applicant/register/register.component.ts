import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Company } from 'src/app/model/company.enum';
import { ApplicantModel } from '../../model/applicant.model';
import { ApplicantService } from '../../services/applicant.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  modalTitle: string = "Create New Job";
  @ViewChild('registerForm') registerForm: NgForm;
  @ViewChild('closebutton') closebutton: any;
  applicantData: ApplicantModel;
  modalPrompt: TemplateRef<any>;
  companyList: any;
  isSaving: Boolean = true;
  isSuccessNotif: Boolean = true;
  public subscription: Subscription;

  constructor(private _applicantService: ApplicantService,
    private _router: Router) {
      this.applicantData = new ApplicantModel();
     }

  ngOnInit(): void {
   this.getCompany();
  }

  Confirm(ConfirmationSave: TemplateRef<any>, PromptToAddRole: TemplateRef<any>) {
    this.modalPrompt = PromptToAddRole;
     }
  SavePersonDetails(): void {
    this.isSaving = false;
    let createdDate = new Date();
    this.applicantData.CreatedDate = createdDate.toISOString();
    this.applicantData.CreatedBy = "Admin.Job"
    this.applicantData.Purge = "N";

    this.resetSubscription();

    this.subscription = this._applicantService.postApplicant(this.applicantData).subscribe( () => {
        this.isSaving = true;
        this.isSuccessNotif = false;
        this.closeModal();
        setTimeout(() =>{
          this.isSuccessNotif = true;
        }, 2000);
        
        this.registerForm.reset();
      },
      err => { console.log(err);
                this.isSaving =true;
      })
    
  }

  getCompany(): any {
    let enumCompany = Object.keys(Company).map(key => Company[key]).filter(k => !(parseInt(k) >= 0));
    //console.log(enumCompany);
    let num = 1;
    let company = [];
    for (const key in enumCompany) {
      company.push({ id: num, value: enumCompany[key]});
      num++;
    }
    return company;
  }

  Decline(): void {
   // this.modalRefChild.hide();
  }
  PromptConfirm(){
    // this.getAllRole();
    // this.modalRefChild1.hide();
  }
  PromptDecline(){
    // this.modalRefChild1.hide();
    // this.BackTolist();
  }

  backtoList(): void {
    this._router.navigateByUrl("/job-dashboard");
  }

  closeModal(){
    this.closebutton.nativeElement.click();
  }

  resetSubscription(): void{
    if (this.subscription){
      this.subscription.unsubscribe();
    };
  }
}
