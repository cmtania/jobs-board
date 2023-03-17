import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateJobComponent } from './job/create-job/create-job.component';
import { JobDetailsComponent } from './job/job-details/job-details.component';
import { RegisterComponent } from './applicant/register/register.component';
import { EditJobComponent } from './job/edit-job/edit-job.component';
import { JobDashboardComponent } from './job/job-dashboard/job-dashboard.component';


const routes: Routes = [
  { path: 'job-dashboard', component: JobDashboardComponent },
  { path: 'create-job', component: CreateJobComponent },
  { path: 'edit-job/:id', component: EditJobComponent },
  { path: 'view-job/:id', component: JobDetailsComponent },
  { path: 'register', component: RegisterComponent },
  { path: '',redirectTo: '/job-dashboard',pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
