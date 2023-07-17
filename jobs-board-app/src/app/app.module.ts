import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { CreateJobComponent } from './job/create-job/create-job.component';
import { JobDetailsComponent } from './job/job-details/job-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostedDatePipe } from './shared/pipe/postedDate-pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterDataPipe } from '../shared/pipe/filterdata.pipe';
import { NumberDirective } from './shared/directives/numbers-only.directive';
import { FilterTextPipe } from './shared/pipe/filter-pipe.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './applicant/register/register.component';
import { JobService } from '../app/services/job-services';
import { ApplicantService } from './services/applicant.service';
import { EditJobComponent } from './job/edit-job/edit-job.component';
import { JobDashboardComponent } from './job/job-dashboard/job-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    JobDashboardComponent,
    CreateJobComponent,
    EditJobComponent,
    JobDetailsComponent,
    RegisterComponent,
    PostedDatePipe,
    FilterDataPipe,
    NumberDirective,
    FilterTextPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgxSpinnerModule,
    NgbModule,
    ReactiveFormsModule
  ],
  exports: [PostedDatePipe,
            NgxSpinnerModule,
            BrowserAnimationsModule,
            FilterDataPipe,
            NumberDirective,
            FilterTextPipe],
  providers: [JobService, ApplicantService],
  bootstrap: [AppComponent]
})
export class AppModule { }
