import { Component } from '@angular/core';
import { Company } from 'src/app/model/company.enum';
import { JobModel } from 'src/app/model/job-model';
import { JobService } from 'src/app/services/job-services';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'remoteJobs';
  constructor( ){}

  ngOnInit(): void {
}


}
