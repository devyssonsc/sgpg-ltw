import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { LogoutComponent } from './components/logout/logout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LogoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'sgpg-ltw';

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check if the user is logged in and has a valid role
    const role = localStorage.getItem('role');
    if (!role) {
      this.router.navigate(['/login']);
    } else {
      // Redirect based on the user's role
      switch (role) {
        case 'ADMIN':
          this.router.navigate(['/admin-panel']);
          break;
        case 'FUNC_ADMIN':
          this.router.navigate(['/func-admin-panel']);
          break;
        case 'FUNC_SERVICOS':
          this.router.navigate(['/func-serv-panel']);
          break;
        case 'CLIENTE':
          this.router.navigate(['/costumer-panel']);
          break;
        case 'OPERADOR':
          this.router.navigate(['/operator-panel']);
          break;
        default:
          this.router.navigate(['/login']);
      }
    }
  }
}
