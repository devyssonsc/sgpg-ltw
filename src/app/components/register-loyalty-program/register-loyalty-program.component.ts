import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-loyalty-program',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './register-loyalty-program.component.html',
  styleUrl: './register-loyalty-program.component.scss'
})
export class RegisterLoyaltyProgramComponent {
  prizes: any[] = [];

  addPrizeForm = new FormGroup({
    inputName: new FormControl('', [Validators.required]),
    inputPoints: new FormControl('', [Validators.required, Validators.min(1)])
  })

  loyaltyProgramForm = new FormGroup({
    inputNameProgram: new FormControl('', [Validators.required]),
    inputPointsProgram: new FormControl('', [Validators.required, Validators.min(1)])
  });

  apiUrl = 'http://localhost:8080/api';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private httpClient: HttpClient
  ) { }

  addPrize(){
    const prize = {
      name: this.addPrizeForm.value.inputName,
      pointsNeeded: this.addPrizeForm.value.inputPoints
    }

    this.prizes.push(prize);
    this.addPrizeForm.reset();

    this.closeAddPrizesModal();
  }

  createLoyaltyProgram() {
    const loyaltyProgram = {
      programName: this.loyaltyProgramForm.value.inputNameProgram,
      pointsPerEuro: this.loyaltyProgramForm.value.inputPointsProgram,
      prizes: this.prizes
    };

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    })

    this.httpClient.post(`${this.apiUrl}/programa-fidelidade`, loyaltyProgram, {headers}).subscribe(
      (response) => {
        console.log('Loyalty program created successfully:', response);

        alert('Programa de fidelidade criado com sucesso!');
      },
      (error) => {
        console.error('Error creating loyalty program:', error);
      }
    )

    // Reset form and prizes after creation
    this.loyaltyProgramForm.reset();
    this.prizes = [];
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
