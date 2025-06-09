import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { LogoutComponent } from '../../components/logout/logout.component';
import { Router } from '@angular/router';
import { Role } from '../../enums/role.enum';

@Component({
  selector: 'app-operator-panel',
  standalone: true,
  imports: [HeaderComponent, FormsModule, ReactiveFormsModule, HttpClientModule, LogoutComponent],
  templateUrl: './operator-panel.component.html',
  styleUrl: './operator-panel.component.scss'
})
export class OperatorPanelComponent implements OnInit {

  registerStockEntryForm = new FormGroup({
    inputProduct: new FormControl('', Validators.required),
    inputQuantity: new FormControl('', [Validators.required, Validators.min(1)]),
    inputUnityPrice: new FormControl('', [Validators.required, Validators.min(0)])
  });

  registerSaleForm = new FormGroup({
    inputSelectedCliente: new FormControl('', Validators.required),
    inputSelectedProduct: new FormControl('', Validators.required),
    inputSelectedQuantity: new FormControl('', [Validators.required, Validators.min(1)]),
  });

  produtosAdicionados: any[] = [];

  produtosDisponiveis: any[] = [];

  costumers: any[] = [];

  apiUrl = "http://localhost:8080/api";

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private httpClient: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('role') !== Role.OPERADOR) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      localStorage.removeItem('id');
      this.router.navigate(['/login']);
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    this.httpClient.get(`${this.apiUrl}/users`, { headers }).subscribe(
      (response: any) => {
        response.forEach((user: any) => {
          if (user.role == 'CLIENTE') {
            this.costumers.push(user);
          }
        });
        console.log(this.costumers);
      },
      (error) => {
        console.error('Error fetching users:', error.message);
      }
    );

    this.httpClient.get('http://localhost:8080/api/produtos').subscribe(
      (response: any) => {
        console.log('Products fetched successfully:', response);
        this.produtosDisponiveis = response;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  addProduct() {
    const productId = this.registerSaleForm.value.inputSelectedProduct;

    this.produtosDisponiveis.forEach((produto) => {
      if (produto.id == productId) {
        this.produtosAdicionados.push(produto);
      }
    })

    //zerar cada campo do formulário
    this.registerSaleForm.patchValue({
      inputSelectedProduct: '',
      inputSelectedQuantity: ''
    });
  }

  registerSale() {

    const data = {
      produtos: [] as any[],
      precoTotal: 0,
      clienteId: this.registerSaleForm.value.inputSelectedCliente,
      operadorId: localStorage.getItem('id')
    }

    this.produtosAdicionados.forEach((produto: any) => {
      data.produtos.push({
        produtoId: produto.id,
        quantidade: produto.quantidade
      });
      data.precoTotal += produto.precoUnitario * produto.quantidade;
    })

    console.log(data);

    this.httpClient.post('http://localhost:8080/api/vendas', data).subscribe(
      (response) => {
        console.log('Sale registered successfully:', response);
      },
      (error) => {
        console.error('Error registering sale:', error);
      }
    )

    this.closeRegisterSaleModal();
  }

  redeemPrize() {
    alert("redeemPrize() method called");
    this.closeRedeemPrizeModal();
  }

  registerStockEntry() {
    const data = {
      nome: this.registerStockEntryForm.value.inputProduct,
      quantidade: this.registerStockEntryForm.value.inputQuantity,
      precoUnitario: this.registerStockEntryForm.value.inputUnityPrice
    }

    this.httpClient.post('http://localhost:8080/api/produtos', data).subscribe(
      (response) => {
        console.log('Product registered successfully:', response);
      },
      (error) => {
        console.error('Error registering product:', error);
      }
    )

    this.closeRegisterStockEntryModal();
  }

  assignCard() {
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

  openRedeemPrizeModal() {
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

  closeAllModals() {
    this.closeRegisterSaleModal();
    this.closeRedeemPrizeModal();
    this.closeRegisterStockEntryModal();
    this.closeAssignCardModal();
  }
}
