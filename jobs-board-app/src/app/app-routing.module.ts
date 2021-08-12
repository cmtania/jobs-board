import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateJobComponent } from './create-job/create-job.component';
import { EditJobComponent } from './edit-job/edit-job.component';
import { HomeComponent } from './home/home.component';
import { JobDetailsComponent } from './job-details/job-details.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'create-job', component: CreateJobComponent },
  { path: 'edit-job/:id', component: EditJobComponent },
  { path: 'view-job/:id', component: JobDetailsComponent },
  { path: '',redirectTo: '/home',pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
