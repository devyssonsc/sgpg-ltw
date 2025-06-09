import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { LogoutComponent } from '../../components/logout/logout.component';
import { Router } from '@angular/router';
import { Role } from '../../enums/role.enum';

@Component({
  selector: 'app-func-serv-panel',
  standalone: true,
  imports: [HeaderComponent, LogoutComponent],
  templateUrl: './func-serv-panel.component.html',
  styleUrl: './func-serv-panel.component.scss'
})
export class FuncServPanelComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    // Initialization logic can go here
    if (localStorage.getItem('role') !== Role.FUNC_SERVICOS) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      localStorage.removeItem('id');
      this.router.navigate(['/login']);
    }
  }

  // Additional methods and properties can be added as needed

}
