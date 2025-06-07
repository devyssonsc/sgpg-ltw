import { Component, ElementRef, Renderer2 } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent {

  isEmployee: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2){}

  toggleEmployeeView() {
    this.isEmployee = !this.isEmployee;
  }

  openModal(){
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
    const modal = this.el.nativeElement.querySelector('.modal-add-user');
    const overlay = this.el.nativeElement.querySelector('#overlay');
    
    alert('User registered successfully!');
    // Here you would typically handle the registration logic
    // For now, we just close the modal
    this.closeModal();
  }
}
