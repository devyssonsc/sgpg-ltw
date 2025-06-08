import { Component, ElementRef, Renderer2 } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-operator-panel',
  standalone: true,
  imports: [HeaderComponent, FormsModule],
  templateUrl: './operator-panel.component.html',
  styleUrl: './operator-panel.component.scss'
})
export class OperatorPanelComponent {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ){}

  addProduct(){
    alert("addProduct() method called");
  }

  registerSale(){
    alert("registerSale() method called");
    this.closeRegisterSaleModal();
  }

  redeemPrize(){
    alert("redeemPrize() method called");
    this.closeRedeemPrizeModal();
  }

  registerStockEntry(){
    alert("registerStockEntry() method called");
    this.closeRegisterStockEntryModal();
  }

  assignCard(){
    alert("assignCard() method called");
    this.closeAssignCardModal();
  }

  openRegisterSaleModal() {
    const modal = this.el.nativeElement.querySelector('.modal-register-sale');
    const overlay = this.el.nativeElement.querySelector('#overlay');
    const button = this.el.nativeElement.querySelector('#btn-register-sale');

    this.renderer.addClass(button, 'btn-filled');
    this.renderer.setStyle(modal, 'display', 'flex');
    this.renderer.setStyle(overlay, 'display', 'block');
  }

  closeRegisterSaleModal() {
    const modal = this.el.nativeElement.querySelector('.modal-register-sale');
    const overlay = this.el.nativeElement.querySelector('#overlay');
    const button = this.el.nativeElement.querySelector('#btn-register-sale');
    this.renderer.removeClass(button, 'btn-filled');
    this.renderer.setStyle(modal, 'display', 'none');
    this.renderer.setStyle(overlay, 'display', 'none');
  }

  openRedeemPrizeModal(){
    const modal = this.el.nativeElement.querySelector('.modal-redeem-prize');
    const overlay = this.el.nativeElement.querySelector('#overlay');
    const button = this.el.nativeElement.querySelector('#btn-redeem-prize');

    this.renderer.addClass(button, 'btn-filled');
    this.renderer.setStyle(modal, 'display', 'flex');
    this.renderer.setStyle(overlay, 'display', 'block');
  }

  closeRedeemPrizeModal() {
    const modal = this.el.nativeElement.querySelector('.modal-redeem-prize');
    const overlay = this.el.nativeElement.querySelector('#overlay');
    const button = this.el.nativeElement.querySelector('#btn-redeem-prize');
    this.renderer.removeClass(button, 'btn-filled');
    this.renderer.setStyle(modal, 'display', 'none');
    this.renderer.setStyle(overlay, 'display', 'none');
  }

  openRegisterStockEntryModal() {
    const modal = this.el.nativeElement.querySelector('.modal-register-stock-entry');
    const overlay = this.el.nativeElement.querySelector('#overlay');
    const button = this.el.nativeElement.querySelector('#btn-register-stock-entry');
    this.renderer.addClass(button, 'btn-filled');
    this.renderer.setStyle(modal, 'display', 'flex');
    this.renderer.setStyle(overlay, 'display', 'block');
  }

  closeRegisterStockEntryModal() {
    const modal = this.el.nativeElement.querySelector('.modal-register-stock-entry');
    const overlay = this.el.nativeElement.querySelector('#overlay');
    const button = this.el.nativeElement.querySelector('#btn-register-stock-entry');
    this.renderer.removeClass(button, 'btn-filled');
    this.renderer.setStyle(modal, 'display', 'none');
    this.renderer.setStyle(overlay, 'display', 'none');
  }

  openAssignCardModal() {
    const modal = this.el.nativeElement.querySelector('.modal-assign-card');
    const overlay = this.el.nativeElement.querySelector('#overlay');
    const button = this.el.nativeElement.querySelector('#btn-assign-card');
    this.renderer.addClass(button, 'btn-filled');
    this.renderer.setStyle(modal, 'display', 'flex');
    this.renderer.setStyle(overlay, 'display', 'block');
  }

  closeAssignCardModal() {
    const modal = this.el.nativeElement.querySelector('.modal-assign-card');
    const overlay = this.el.nativeElement.querySelector('#overlay');
    const button = this.el.nativeElement.querySelector('#btn-assign-card');
    this.renderer.removeClass(button, 'btn-filled');
    this.renderer.setStyle(modal, 'display', 'none');
    this.renderer.setStyle(overlay, 'display', 'none');
  }

  closeAllModals(){
    this.closeRegisterSaleModal();
    this.closeRedeemPrizeModal();
    this.closeRegisterStockEntryModal();
    this.closeAssignCardModal();
  }
}
