import { NgModule } from "@angular/core";
import { LayoutComponent } from "./layout.component";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EditJobComponent } from "../job/edit-job/edit-job.component";
import { JobDetailsComponent } from "../job/job-details/job-details.component";
import { JobDashboardComponent } from "../job/job-dashboard/job-dashboard.component";
import { LayoutRoutingModule } from "./layout-routing.module";
import { NgbModule, NgbTypeaheadModule } from "@ng-bootstrap/ng-bootstrap";
import { NumberDirective } from "src/app/shared/directives/numbers-only.directive";
import { FilterTextPipe } from "src/app/shared/pipe/filter-pipe.pipe";
import { PostedDatePipe } from "src/app/shared/pipe/postedDate-pipe";
import { FilterDataPipe } from "src/shared/pipe/filterdata.pipe";
import { CreateJobComponent } from "../job/create-job-modal/create-job.component";
import { BsModalService, ModalModule } from "ngx-bootstrap/modal";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutRoutingModule,
    NgbModule,
    ModalModule,
    NgbTypeaheadModule
  ],
  declarations: [
    LayoutComponent,
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
  providers: [BsModalService],
})
export class LayoutModule { }