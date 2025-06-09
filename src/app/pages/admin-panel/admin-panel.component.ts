import { Component, ElementRef, input, OnInit, Renderer2 } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { Role } from '../../enums/role.enum';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { LogoutComponent } from '../../components/logout/logout.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [HeaderComponent, FormsModule, ReactiveFormsModule, HttpClientModule, LogoutComponent],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent implements OnInit {

  Role = Role;
  roles: any;

  clientes: any[] = [];
  funcionarios: any[] = [];

  userRegisterForm = new FormGroup({
    inputName: new FormControl('', [
      Validators.required
    ]),
    inputEmail: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    inputUsername: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    inputPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
    ]),
    inputRole: new FormControl('', [
      Validators.required
    ])
  });

  token = localStorage.getItem('token') || '';

  apiUrl = "http://localhost:8080/api";

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private httpClient: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('role') !== Role.ADMIN) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      localStorage.removeItem('id');
      this.router.navigate(['/login']);
    }

    this.roles = Object.values(Role);

    this.getAllUsers();
  }

  getAllUsers() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })

    this.httpClient.get(`${this.apiUrl}/users`, { headers }).subscribe(
      (response: any) => {
        console.log('Users fetched successfully:', response);
        response.forEach((user: any) => {
          if (!this.clientes.find(c => c.username === user.username) && !this.funcionarios.find(f => f.username === user.username)) {
            if (user.role === Role.CLIENTE) {
              this.clientes.push(user);
            } else if (user.role != Role.CLIENTE && user.username != localStorage.getItem('username')) {
              this.funcionarios.push(user);
            }
          }
        });
      },
      (error) => {
        console.error('Error fetching users:', error.message);
      }
    );
  }

  openModal() {
    const modal = this.el.nativeElement.querySelector('.modal-add-user');
    const overlay = this.el.nativeElement.querySelector('#overlay');

    if (modal) {
      this.renderer.setStyle(modal, 'display', 'block');
      this.renderer.setStyle(overlay, 'display', 'block');
    }
  }

  closeModal() {
    const modal = this.el.nativeElement.querySelector('.modal-add-user');
    const overlay = this.el.nativeElement.querySelector('#overlay');

    if (modal) {
      this.renderer.setStyle(modal, 'display', 'none');
      this.renderer.setStyle(overlay, 'display', 'none');
    }
  }

  registerUser() {
    const data = {
      name: this.userRegisterForm.value.inputName,
      email: this.userRegisterForm.value.inputEmail,
      username: this.userRegisterForm.value.inputUsername,
      password: this.userRegisterForm.value.inputPassword,
      role: this.userRegisterForm.value.inputRole
    };

    console.log('User registered:', data);

    this.httpClient.post(`${this.apiUrl}/users/register`, data).subscribe(
      response => {
        console.log('User registered successfully:', response);
        this.getAllUsers();
      },
      error => {
        console.error('Error registering user:', error.message);
      }
    )

    this.closeModal();

    this.userRegisterForm.reset();
  }
}
