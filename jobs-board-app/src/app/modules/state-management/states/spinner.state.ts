import { State, Action, StateContext, Selector } from '@ngxs/store';
import { HideSpinner, ShowSpinner } from '../actions/spinner.action';

export interface SpinnerStateModel {
  loading: boolean;
}

@State<SpinnerStateModel>({
  name: 'spinner',
  defaults: {
    loading: false
  }
})
export class SpinnerState {

  @Selector()
  static isLoading(state: SpinnerStateModel): boolean {
    return state.loading;
  }

  @Action(ShowSpinner)
  show(ctx: StateContext<SpinnerStateModel>) {
    console.log("Spinner SHOW dispatched"); // Debug log
    ctx.patchState({ loading: true });
  }

  @Action(HideSpinner)
  hide(ctx: StateContext<SpinnerStateModel>) {
    ctx.patchState({ loading: false });
  }
}
