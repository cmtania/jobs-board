import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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
  @ViewChild('closebutton') closebutton: any;
  applicantData: ApplicantModel;
  modalPrompt: TemplateRef<any>;
  companyList: any;
  isSaving: Boolean = true;
  isSuccessNotif: Boolean = true;
  public subscription: Subscription;
  public isValidForm: boolean = false;

  public registerForm: FormGroup = new FormGroup({
    FirstName: new FormControl(''),
    MiddleName: new FormControl(''),
    LastName: new FormControl(''),
    Age: new FormControl(0),
    Gender: new FormControl(''),
    Address: new FormControl(''),
    Email: new FormControl(''),
  })


  
  constructor(private _applicantService: ApplicantService,
              private _router: Router,
              private fb: FormBuilder) {
      this.applicantData = new ApplicantModel();

      
     }

  ngOnInit(): void {
   this.getCompany();
   this.setFormGroup();
  }

  setFormGroup(): void {
    this.registerForm = this.fb.group({
      FirstName: ['', Validators.required],
      MiddleName: ['', Validators.required],
      LastName: ['', Validators.required],
      Age: [0, Validators.max(150), Validators.min(18)],
      Gender: ['', Validators.required],
      Address: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  validateField(field: string){
    console.log('field', field);
    const { value, markAsTouched, errors} = this.f[field];
    console.log('value', value);

    if(value === "" || value === 0 || value === "0"){
        this.registerForm.controls[field].setErrors({'incorrect': true});
    } else {
      this.registerForm.controls[field].setErrors(null);
    }

    this.isValidForm = this.registerForm.status === "VALID" ? true : false;

    console.log('statuss', this.registerForm.status);
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
    let enumCompany = Object.keys(Company).map((key: any) => Company[key]).filter(k => !(parseInt(k) >= 0));
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
      this.subscription?.unsubscribe();
  }
}
