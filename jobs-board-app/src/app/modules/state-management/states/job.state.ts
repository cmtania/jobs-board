import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddJob, LoadJobs } from '../actions/job.action';

export interface JobStateModel {
  jobs: any[];
}

@State<JobStateModel>({
  name: 'jobState',
  defaults: {
    jobs: []
  }
})
export class JobState {

  @Selector()
  static getJobs(state: JobStateModel): any[] {
    if(state.jobs.length === 0) {
      return [];
    }
    const desc = true; // Default to descending order

    return state.jobs.slice().sort((a, b) => {
      const dateA = new Date(a.CreatedDate).getTime();
      const dateB = new Date(b.CreatedDate).getTime();
      return desc ? dateB - dateA : dateA - dateB;
    });
  }

  @Action(LoadJobs)
  loadJobs(
    { patchState }: StateContext<JobStateModel>,
    { payload }: LoadJobs
   ) {
    console.log('Loading jobs:', [payload]);
    patchState({ jobs: payload });
  }

  @Action(AddJob)
  addJob(
    { getState, patchState }: StateContext<JobStateModel>,
    { payload }: AddJob
  ) {
    const state = getState();
    patchState({ jobs: [...state.jobs, payload] });
  };

}
