import { Component } from '@angular/core';
@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  isExpanded: boolean = false;
  constructor(){}
}
