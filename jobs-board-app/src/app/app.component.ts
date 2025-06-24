import { Component, Injector } from '@angular/core';
import { Store } from '@ngxs/store';
import { JobService } from './modules/services/job-services';
import { take } from 'rxjs';
import { LoadJobs } from './modules/state-management/actions/job.action';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'remoteJobs';

  private readonly store: Store;
  private readonly jobService: JobService;
  constructor(injector: Injector){
    this.store = injector.get(Store);
    this.jobService = injector.get(JobService);
  }

  ngOnInit(): void {
    // Initialize any global state or services here
    this.jobService.getInitialData().pipe(
      take(1)
    ).subscribe(data => {
      this.store.dispatch(new LoadJobs(data));
    });
    // For example, you can dispatch an action to load initial data
    // this.store.dispatch(new LoadInitialDataAction());
  }


}
