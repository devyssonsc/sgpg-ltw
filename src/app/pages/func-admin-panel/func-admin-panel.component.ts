import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { RegisterLoyaltyProgramComponent } from '../../components/register-loyalty-program/register-loyalty-program.component';
import { ManageScheduledServiceComponent } from '../../components/manage-scheduled-service/manage-scheduled-service.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LogoutComponent } from '../../components/logout/logout.component';
import { Role } from '../../enums/role.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-func-admin-panel',
  standalone: true,
  imports: [HeaderComponent, RegisterLoyaltyProgramComponent, ManageScheduledServiceComponent, HttpClientModule, LogoutComponent],
  templateUrl: './func-admin-panel.component.html',
  styleUrl: './func-admin-panel.component.scss'
})
export class FuncAdminPanelComponent implements OnInit {
  registerLoyaltyProgramVisible: boolean = false;
  manageScheduledServicesVisible: boolean = false;

  agendamentos: any[] = [];

  apiUrl: string = 'http://localhost:8080/api'; // Replace with your actual API URL

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private httpClient: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('role') !== Role.CLIENTE) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      localStorage.removeItem('id');
      this.router.navigate(['/login']);
    }
  }

  viewRegisterLoyaltyProgram() {
    const registerLoyaltyProgramButton = this.el.nativeElement.querySelector('#register-loyalty-program-button');
    const manageScheduledServicesButton = this.el.nativeElement.querySelector('#manage-scheduled-services-button');

    manageScheduledServicesButton.classList.remove('btn-filled');
    registerLoyaltyProgramButton.classList.add('btn-filled');

    this.registerLoyaltyProgramVisible = true;
    this.manageScheduledServicesVisible = false;
  }

  viewManageScheduledServices() {
    const registerLoyaltyProgramButton = this.el.nativeElement.querySelector('#register-loyalty-program-button');
    const manageScheduledServicesButton = this.el.nativeElement.querySelector('#manage-scheduled-services-button');

    registerLoyaltyProgramButton.classList.remove('btn-filled');
    manageScheduledServicesButton.classList.add('btn-filled');

    this.registerLoyaltyProgramVisible = false;
    this.manageScheduledServicesVisible = true;
  }
}
