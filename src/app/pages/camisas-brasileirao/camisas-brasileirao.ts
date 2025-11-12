import { Component, OnInit } from '@angular/core';
import { Produto } from '../../models/produto.model';
import { ProdutoService } from '../../services/produto';
import { CarrinhoService } from '../../services/carrinho.service'; // 1. IMPORTE O CARRINHO SERVICE
import Swal from 'sweetalert2';

// A interface ProdutoComTamanho não está sendo usada, pode remover se quiser
// interface ProdutoComTamanho extends Produto {
//  selectedSize?: string | null;
//  addToCartError?: string | null;
// }

@Component({
  selector: 'app-camisas-brasileirao',
  standalone: false,
  templateUrl: './camisas-brasileirao.html',
  styleUrls: ['./camisas-brasileirao.css']
})
export class CamisasBrasileirao implements OnInit {
  listaProdutos: Produto[] = [];
  tamanhosSelecionados: { [id: number]: string } = {};

  constructor(
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService // 2. INJETE O CARRINHO SERVICE
  ) {}

  ngOnInit(): void {
    this.listaProdutos = this.produtoService.getProdutosBrasileirao();
  }

  selecionarTamanho(produtoId: number, tamanho: string): void {
    this.tamanhosSelecionados[produtoId] = tamanho;
  }

  adicionarAoCarrinho(produto: Produto): void {
    const tamanhoSelecionado = this.tamanhosSelecionados[produto.id];

    if (!tamanhoSelecionado) {
      // Sua validação de tamanho (está correta)
      Swal.fire({
        icon: 'warning',
        title: 'Selecione um tamanho!',
        text: 'Você precisa escolher um tamanho antes de adicionar ao carrinho.',
        background: '#0A2A08',
        color: 'white',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'swal-btn-custom'
        }
      });
      console.log('CHAMANDO O CARRINHO SERVICE COM:', produto, tamanhoSelecionado); // <<< ADICIONE ESTE LOG
this.carrinhoService.adicionarItem(produto, tamanhoSelecionado);
      return;
    }

    // 3. CHAME O SERVIÇO AQUI
    this.carrinhoService.adicionarItem(produto, tamanhoSelecionado);

    // Agora mostre o alerta de sucesso (está correto)
    Swal.fire({
      icon: 'success',
      title: 'Camisa adicionada!',
      text: `Camisa "${produto.nome}" (${tamanhoSelecionado}) foi adicionada ao carrinho.`,
      background: '#0A2A08',
      color: 'white',
      confirmButtonText: 'Continuar comprando',
      customClass: {
        confirmButton: 'swal-btn-custom'
      }
    });

    // Opcional: Limpar o tamanho selecionado após adicionar
    // delete this.tamanhosSelecionados[produto.id];
  }

  isTamanhoSelecionado(produtoId: number, tamanho: string): boolean {
    return this.tamanhosSelecionados[produtoId] === tamanho;
  }
}
