import { Component, ElementRef, Renderer2 } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-costumer-panel',
  standalone: true,
  imports: [HeaderComponent, FormsModule],
  templateUrl: './costumer-panel.component.html',
  styleUrl: './costumer-panel.component.scss'
})
export class CostumerPanelComponent {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  scheduleService(){
    alert("Service scheduled successfully!");

    this.closeScheduleServiceModal();
  }

  openScheduleServiceModal(){
    const modal = this.el.nativeElement.querySelector('.modal-schedule-service');
    const overlay = this.el.nativeElement.querySelector('#overlay');

    this.renderer.setStyle(modal, 'display', 'block');
    this.renderer.setStyle(overlay, 'display', 'block');
  }

  closeScheduleServiceModal(){
    const modal = this.el.nativeElement.querySelector('.modal-schedule-service');
    const overlay = this.el.nativeElement.querySelector('#overlay');

    this.renderer.setStyle(modal, 'display', 'none');
    this.renderer.setStyle(overlay, 'display', 'none');
  }
}
