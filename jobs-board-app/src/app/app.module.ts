import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { CreateJobComponent } from './create-job/create-job.component';
import { EditJobComponent } from './edit-job/edit-job.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { FormsModule } from '@angular/forms';
import { PostedDatePipe } from './shared/pipe/postedDate-pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NumberDirective } from './shared/directives/numbers-only.directive';
import { FilterTextPipe } from './shared/pipe/filter-pipe.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateJobComponent,
    EditJobComponent,
    JobDetailsComponent,
    PostedDatePipe,
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
    NgbModule
  ],
  exports: [PostedDatePipe,
            NgxSpinnerModule,
            BrowserAnimationsModule,
            NumberDirective,
            FilterTextPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
