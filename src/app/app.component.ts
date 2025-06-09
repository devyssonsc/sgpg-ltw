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
export class AppComponent {
  title = 'sgpg-ltw';
}
