import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-scheduled-service',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './manage-scheduled-service.component.html',
  styleUrl: './manage-scheduled-service.component.scss'
})
export class ManageScheduledServiceComponent implements OnInit {

  agendamentos: any[] = [];

  apiUrl = 'http://localhost:8080/api'; // Adjust the API URL as needed

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.httpClient.get(`${this.apiUrl}/agendamentos/futuros`).subscribe(
      (response: any) => {
        console.log(response);
        this.agendamentos = response;
      },
      (error) => {
        console.error('Error fetch:', error);
      }
    )
  }

  assignEmployee() {
    alert('Employee assigned to the scheduled service successfully!');
    // Here you would typically handle the logic for assigning an employee
    // For now, we just show an alert

    this.closeAssignEmployeeModal();
  }

  registerMaterials() {
    alert('Materials registered successfully!');
    // Here you would typically handle the logic for registering materials
    // For now, we just show an alert

    this.closeRegisterMaterialsModal();
  }

  closeRegisterMaterialsModal() {
    const modal = this.el.nativeElement.querySelector('.modal-register-materials');
    const overlay = this.el.nativeElement.querySelector('#overlay');

    if (modal) {
      this.renderer.setStyle(modal, 'display', 'none');
      this.renderer.setStyle(overlay, 'display', 'none');
    }
  }

  openRegisterMaterialsModal() {
    const modal = this.el.nativeElement.querySelector('.modal-register-materials');
    const overlay = this.el.nativeElement.querySelector('#overlay');

    if (modal) {
      this.renderer.setStyle(modal, 'display', 'block');
      this.renderer.setStyle(overlay, 'display', 'block');
    }
  }

  closeAssignEmployeeModal() {
    const modal = this.el.nativeElement.querySelector('.modal-assign-employee');
    const overlay = this.el.nativeElement.querySelector('#overlay');
    if (modal) {
      this.renderer.setStyle(modal, 'display', 'none');
      this.renderer.setStyle(overlay, 'display', 'none');
    }
  }

  openAssignEmployeeModal() {
    const modal = this.el.nativeElement.querySelector('.modal-assign-employee');
    const overlay = this.el.nativeElement.querySelector('#overlay');

    if (modal) {
      this.renderer.setStyle(modal, 'display', 'block');
      this.renderer.setStyle(overlay, 'display', 'block');
    }
  }
}
