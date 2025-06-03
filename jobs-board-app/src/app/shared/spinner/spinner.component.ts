import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SpinnerState } from 'src/app/modules/state-management/states/spinner.state';

@Component({
  selector: 'app-spinner',
  standalone: false,
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {

  @Select(SpinnerState.isLoading) isLoading$!: Observable<boolean>;
}
