import { NgModule } from "@angular/core";
import { LayoutComponent } from "./layout.component";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CreateJobComponent } from "../job/create-job/create-job.component";
import { EditJobComponent } from "../job/edit-job/edit-job.component";
import { JobDetailsComponent } from "../job/job-details/job-details.component";
import { JobService } from "../services/job-services";
import { ApplicantService } from "../services/applicant.service";
import { JobDashboardComponent } from "../job/job-dashboard/job-dashboard.component";
import { BrowserModule } from "@angular/platform-browser";
import { LayoutRoutingModule } from "./layout-routing.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NumberDirective } from "src/app/shared/directives/numbers-only.directive";
import { FilterTextPipe } from "src/app/shared/pipe/filter-pipe.pipe";
import { PostedDatePipe } from "src/app/shared/pipe/postedDate-pipe";
import { FilterDataPipe } from "src/shared/pipe/filterdata.pipe";
import { HomeComponent } from "../home/home.component";
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutRoutingModule,
    NgbModule
  ],
  declarations: [
    LayoutComponent,
    HomeComponent,
    JobDashboardComponent,
    CreateJobComponent,
    EditJobComponent,
    JobDetailsComponent,
    PostedDatePipe,
    FilterDataPipe,
    NumberDirective,
    FilterTextPipe,
  ],
  exports:[PostedDatePipe,
            FilterDataPipe,
            NumberDirective,
            FilterTextPipe],  
  providers: [JobService, ApplicantService],
})
export class LayoutModule { }