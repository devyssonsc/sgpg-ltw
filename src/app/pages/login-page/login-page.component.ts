import { Component, input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { LogoutComponent } from '../../components/logout/logout.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HeaderComponent, HttpClientModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})

export class LoginPageComponent {
  apiUrl = "http://localhost:8080/api";

  loginForm = new FormGroup({
    inputUsername: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    inputPassword: new FormControl('', [
      Validators.required
    ])
  })

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ){}

  onSubmit() {
    const data = {
      username: this.loginForm.value.inputUsername,
      password: this.loginForm.value.inputPassword
    }

    this.httpClient.post(`${this.apiUrl}/auth/login`, data).subscribe(
      (response: any) => {
        console.log(response);
        localStorage.setItem('token', response['token']);
        localStorage.setItem('username', response['username']);
        localStorage.setItem('role', response['role']);
        localStorage.setItem('id', response['id']);
        if(response['role'] === 'ADMIN') {
          this.router.navigate(['/admin-panel']);
        } else if(response['role'] === 'FUNC_ADMIN') {
          this.router.navigate(['/func-admin-panel']);
        } else if(response['role'] === 'FUNC_SERVICOS') {
          this.router.navigate(['/lss']);
        } else if(response['role'] === 'CLIENTE') {
          this.router.navigate(['/costumer-panel']);
        } else if(response['role'] === 'OPERADOR') {
          this.router.navigate(['/operator-panel']);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
