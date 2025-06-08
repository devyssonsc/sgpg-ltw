import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-manager-panel',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './manager-panel.component.html',
  styleUrl: './manager-panel.component.scss'
})
export class ManagerPanelComponent {

}
