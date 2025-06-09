import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';
import { Role } from '../../enums/role.enum';

@Component({
  selector: 'app-lss',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, HeaderComponent],
  templateUrl: './lss.component.html',
  styleUrl: './lss.component.scss'
})
export class LssComponent {
  lssCode: string = '';
  output: string[] = [];
  error: string | null = null;

  exemplos: { nome: string, codigo: string }[] = [
    {
      nome: 'Agendamento simples',
      codigo: `agendar:
  servico: "troca de oleo"
  cliente: "Joana"
  data: 12-03-2025`
    },
    {
      nome: 'Consulta com filtro',
      codigo: `consulta:
  tipo: "servicos"
  periodo_inicio: 01-01-2025
  periodo_fim: 31-01-2025
  filtro: tipo == "mudanca de oleo"`
    },
    {
      nome: 'Indisponibilidade',
      codigo: `indisponibilidade:
  data: 10-04-2025
  motivo: "doenca"`
    },
    {
      nome: 'Férias com intervalo',
      codigo: `ferias:
  de: 01-08-2025
  a: 15-08-2025
  motivo: "verao"`
    },
    {
      nome: 'Definir função (sem chamada)',
      codigo: `def folga_fim_de_semana():
  dias: ["sabado", "domingo"]
  motivo: "descanso"`
    },
    {
      nome: 'Batch de operações',
      codigo: `batch:
  indisponibilidade:
    data: 01-05-2025
    motivo: "feriado"

  ferias:
    de: 01-08-2025
    a: 15-08-2025
    motivo: "verao"

  agendar:
    servico:
      concluido: "revisao geral"
      cliente: "Pedro Almeida"
      data: 20-02-2025`
    },
    {
      nome: 'Variável + if',
      codigo: `dia = "sabado"

if dia == "sabado":
  indisponibilidade:
    motivo: "folga"
else:
  agendar:
    servico: "limpeza"
    cliente: "Luis"
    data: 22-06-2025`
    }
  ];

  constructor(private http: HttpClient, private router: Router) { }

  ngOninit(): void {
    if (localStorage.getItem('role') != Role.FUNC_ADMIN) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      localStorage.removeItem('id');
      this.router.navigate(['/login']);
    }
  }

  carregarExemplo(e: Event): void {
    const codigo = (e.target as HTMLSelectElement).value;
    if (!codigo) {
      this.lssCode = codigo;
      this.output = [];
      this.error = null;
    }
  }

  limparTudo(): void {
    this.lssCode = '';
    this.output = [];
    this.error = null;
  }

  executarLSS(): void {
    this.output = [];
    this.error = null;

    const payload = { script: this.lssCode };

    this.http.post<any>('http://localhost:8080/api/lss/execute', payload).subscribe({
      next: res => {
        if (res.success) {
          this.output = res.output;
          this.error = null;
        } else {
          this.output = [];
          this.error = res.error;
        }
      },
      error: err => {
        this.output = [];
        this.error = 'Erro de comunicação com o servidor: ' + err.message;
      }
    });
  }
}
