import { State, Action, StateContext, Selector } from '@ngxs/store';
import { HideSpinner, ShowSpinner } from '../actions/spinner.action';
import { AddJob, LoadJobs } from '../actions/job.action';

export interface JobStateModel {
  jobs: any[];
}

@State<JobStateModel>({
  name: 'spinner',
  defaults: {
    jobs: []
  }
})
export class JobState {

  @Selector()
  static getJobs(state: JobStateModel): any[] {
    return state.jobs;
  }

  @Action(LoadJobs)
  loadJobs(ctx: StateContext<JobStateModel>, action: LoadJobs) {
    const state = ctx.getState();
    ctx.patchState({
    jobs: [...state.jobs, action.payload]
  });
  }

  @Action(AddJob)
  addJob(ctx: StateContext<JobStateModel>, action: AddJob) {
    const state = ctx.getState();
    ctx.patchState({
    jobs: [...state.jobs, action.payload]
  });
  }
}
