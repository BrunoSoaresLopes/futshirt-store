import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CarrinhoItem, CarrinhoService } from '../../services/carrinho.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-finalizar-compra',
  standalone: false,
  templateUrl: './finalizar-compra.html',
  styleUrls: ['./finalizar-compra.css']
})
export class FinalizarCompraComponent implements OnInit {

  checkoutForm: FormGroup;
  itens$: Observable<CarrinhoItem[]>;
  totalProdutos: number = 0;

  constructor(
    private fb: FormBuilder,
    private carrinhoService: CarrinhoService,
    private router: Router
  ) {
    // Inicializa o formulário reativo com FormBuilder
    this.checkoutForm = this.fb.group({
      // --- Grupo 1: Dados Pessoais ---
      nomeCompleto: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],

      // --- Grupo 2: Endereço de Entrega ---
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{3}$|^\d{8}$/)]], // Aceita XXXXX-XXX ou XXXXXXXX
      rua: ['', [Validators.required]],
      numero: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]], // Apenas números
      bairro: ['', [Validators.required]],
      cidade: ['', [Validators.required]],

      // --- Grupo 3: Pagamento ---
      nomeCartao: ['', [Validators.required, Validators.minLength(5)]],
      numeroCartao: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]], // Exatamente 16 números
      validadeCartao: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]], // Formato MM/AA
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]] // 3 ou 4 números
    });

    // Pega os itens do carrinho
    this.itens$ = this.carrinhoService.itensCarrinho$;
  }

  ngOnInit(): void {
    // Calcula o total dos produtos
    this.totalProdutos = this.carrinhoService.getTotal();
  }

  // Getter (atalho) para acessar os controles do formulário no HTML
  get f() {
    return this.checkoutForm.controls;
  }

  // Método chamado ao enviar o formulário
  onSubmit(): void {
    // Marca todos os campos como "tocados" para exibir erros, se houver
    this.checkoutForm.markAllAsTouched();

    // Se o formulário estiver inválido, para a execução
    if (this.checkoutForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Formulário Inválido',
        text: 'Por favor, corrija os campos marcados em vermelho.',
        background: '#f8f9fa',
        color: '#333',
      });
      return;
    }

    // --- LÓGICA DE FINALIZAÇÃO (SIMULAÇÃO) ---
    // Aqui você enviaria os dados (this.checkoutForm.value) para uma API de Pedidos
    // Como é uma simulação, vamos apenas limpar o carrinho e navegar

    console.log('Dados do Pedido Enviados (Simulação):', this.checkoutForm.value);

    Swal.fire({
      icon: 'success',
      title: 'Compra Realizada!',
      text: 'Seu pedido foi processado com sucesso.',
      background: '#f8f9fa',
      color: '#333',
      timer: 2500,
      showConfirmButton: false
    });

    this.carrinhoService.limparCarrinho();
    this.router.navigate(['/']); // Navega de volta para a Home
  }
}
