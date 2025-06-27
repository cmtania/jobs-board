import { Component, Injector } from '@angular/core';
import { Store } from '@ngxs/store';
import { JobService } from './modules/services/job-services';
import { take } from 'rxjs';
import { LoadJobs } from './modules/state-management/actions/job.action';
import { Company } from './modules/model/company.enum';
import { CommonService } from './modules/services/common.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'remoteJobs';

  private readonly store: Store;
  private readonly jobService: JobService;
  private readonly commonService: CommonService;
  constructor(injector: Injector){
    this.store = injector.get(Store);
    this.jobService = injector.get(JobService);
    this.commonService = injector.get(CommonService);
  }

  ngOnInit(): void {
    this.jobService.getInitialData().pipe(
      take(1)
    ).subscribe((data: any[]) => {
      data.map((x) => {
          return x.CompanyName = this.getCompanyName(x.CompanyId),
            x.CompanyLogo = this.commonService.getCompanyLogo(x.CompanyId);
        });
      this.store.dispatch(new LoadJobs(data));
    });
  }


  private getCompanyName(companyId: number): string {
    return Company[companyId];
  }
}
