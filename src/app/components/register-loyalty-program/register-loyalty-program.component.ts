import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-loyalty-program',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register-loyalty-program.component.html',
  styleUrl: './register-loyalty-program.component.scss'
})
export class RegisterLoyaltyProgramComponent {
  premios = [
    { nome: 'Air Fryer', pontos: 5 },
    { nome: '4× Pneu', pontos: 11 },
    { nome: 'Troca de óleo', pontos: 6 }
  ];

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  addPrize(){
    alert('Prêmio adicionado com sucesso!');

    this.closeAddPrizesModal();
  }

  closeAddPrizesModal() {
    const modal = this.el.nativeElement.querySelector('.modal-add-prizes');
    const overlay = this.el.nativeElement.querySelector('#overlay');

    if (modal) {
      this.renderer.setStyle(modal, 'display', 'none');
      this.renderer.setStyle(overlay, 'display', 'none');
    }
  }

  openAddPrizesModal() {
    const modal = this.el.nativeElement.querySelector('.modal-add-prizes');
    const overlay = this.el.nativeElement.querySelector('#overlay');

    if (modal) {
      this.renderer.setStyle(modal, 'display', 'block');
      this.renderer.setStyle(overlay, 'display', 'block');
    }
  }
}
