import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { LogoutComponent } from '../../components/logout/logout.component';
import { Role } from '../../enums/role.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-panel',
  standalone: true,
  imports: [HeaderComponent, LogoutComponent],
  templateUrl: './manager-panel.component.html',
  styleUrl: './manager-panel.component.scss'
})
export class ManagerPanelComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    // Initialization logic can go here
    if (localStorage.getItem('role') !== Role.GERENTE) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      localStorage.removeItem('id');
      this.router.navigate(['/login']);
    }
  }

  // Additional methods and properties can be added as needed

}
