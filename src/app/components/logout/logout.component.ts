import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {
  path: any;

  constructor(
    private router: Router
  ){}

  ngOnInit(): void {
      this.path = this.router.url;

      console.log(this.path);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('id');

    this.router.navigate(['/login']);
  }
}
