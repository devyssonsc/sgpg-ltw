import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Servico } from '../../enums/servico.enum';
import { LogoutComponent } from '../../components/logout/logout.component';
import { Router } from '@angular/router';
import { Role } from '../../enums/role.enum';

@Component({
  selector: 'app-costumer-panel',
  standalone: true,
  imports: [HeaderComponent, FormsModule, HttpClientModule, ReactiveFormsModule, LogoutComponent],
  templateUrl: './costumer-panel.component.html',
  styleUrl: './costumer-panel.component.scss'
})
export class CostumerPanelComponent implements OnInit {



  Servico = Servico;
  servicos: any[] = [];

  agendamentos: any[] = [];

  scheduleServiceForm = new FormGroup({
    inputServico: new FormControl('', Validators.required),
    inputDate: new FormControl('', Validators.required),
    inputTime: new FormControl('', Validators.required)
  })

  apiUrl = 'http://localhost:8080/api';

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

    this.servicos = Object.values(Servico);



    this.getAgendamentosCliente();
  }

  getAgendamentosCliente() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    })

    this.httpClient.get(`${this.apiUrl}/agendamentos/cliente`, { headers }).subscribe(
      (response: any) => {
        console.log('Scheduled services:', response);
        response.forEach((agendamento: any) => {
          if (!this.agendamentos.find(a => a.id === agendamento.id)) {
            this.agendamentos.push(agendamento);
          }
        });
      },
      (error) => {
        console.error('Error fetching scheduled services:', error);
      }
    )
  }

  scheduleService() {
    const dateValue = this.scheduleServiceForm.get('inputDate')?.value;
    const timeValue = this.scheduleServiceForm.get('inputTime')?.value;

    let formatted: string = '';
    if (dateValue && timeValue) {
      formatted = `${dateValue}T${timeValue}:00`;
      console.log(formatted); // Exemplo: "2024-06-10T15:00:00"
    }

    const data = {
      tipoServico: this.scheduleServiceForm.get('inputServico')?.value,
      dataPrevista: formatted
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    })

    this.httpClient.post(`${this.apiUrl}/agendamentos`, data, { headers }).subscribe(
      response => {
        console.log('Service scheduled successfully:', response);
        this.getAgendamentosCliente();
        this.closeScheduleServiceModal();
      },
      error => {
        console.error('Error scheduling service:', error);
      }
    )
  }

  openScheduleServiceModal() {
    const modal = this.el.nativeElement.querySelector('.modal-schedule-service');
    const overlay = this.el.nativeElement.querySelector('#overlay');

    this.renderer.setStyle(modal, 'display', 'block');
    this.renderer.setStyle(overlay, 'display', 'block');
  }

  closeScheduleServiceModal() {
    const modal = this.el.nativeElement.querySelector('.modal-schedule-service');
    const overlay = this.el.nativeElement.querySelector('#overlay');

    this.renderer.setStyle(modal, 'display', 'none');
    this.renderer.setStyle(overlay, 'display', 'none');
  }
}
