import { Component, ElementRef, Renderer2 } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { RegisterLoyaltyProgramComponent } from '../../components/register-loyalty-program/register-loyalty-program.component';
import { ManageScheduledServiceComponent } from '../../components/manage-scheduled-service/manage-scheduled-service.component';

@Component({
  selector: 'app-func-admin-panel',
  standalone: true,
  imports: [HeaderComponent, RegisterLoyaltyProgramComponent, ManageScheduledServiceComponent],
  templateUrl: './func-admin-panel.component.html',
  styleUrl: './func-admin-panel.component.scss'
})
export class FuncAdminPanelComponent {
  registerLoyaltyProgramVisible: boolean = false;
  manageScheduledServicesVisible: boolean = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

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
