import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "./layout.component";
import { NgModule } from "@angular/core";
import { JobDashboardComponent } from "../job/job-dashboard/job-dashboard.component";
import { EditJobComponent } from "../job/edit-job/edit-job.component";
import { JobDetailsComponent } from "../job/job-details/job-details.component";

const routes: Routes = [{
    path: "",
    component: LayoutComponent,
      children: [
          { path: 'job-dashboard', component: JobDashboardComponent },
          { path: 'edit-job/:id', component: EditJobComponent },
          { path: 'view-job/:id', component: JobDetailsComponent },
          { path: '',redirectTo: '/job-dashboard',pathMatch: 'full'}
      ],       
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class LayoutRoutingModule { }


// const routes: Routes = [
//   { path: 'job-dashboard', component: JobDashboardComponent },
//   { path: 'create-job', component: CreateJobComponent },
//   { path: 'edit-job/:id', component: EditJobComponent },
//   { path: 'view-job/:id', component: JobDetailsComponent },
//   { path: 'register', component: RegisterComponent },
//   { path: '',redirectTo: '/job-dashboard',pathMatch: 'full'}
// ];