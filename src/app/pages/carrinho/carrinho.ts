import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { CarrinhoItem, CarrinhoService } from '../../services/carrinho';
import { FreteService, OpcaoFrete } from '../../services/frete';
import { ProdutoService } from '../../services/produto';
import { Produto } from '../../models/produto.model';
import { UsuarioService } from '../../services/usuario';

export interface CarrinhoItemCompleto {
  itemId: number;
  produto: Produto;
  tamanho: string;
  quantidade: number;
}

@Component({
  selector: 'app-carrinho',
  standalone: false,
  templateUrl: './carrinho.html',
  styleUrls: ['./carrinho.css'],
})
export class CarrinhoComponent implements OnInit, OnDestroy {
  itensVisiveis: CarrinhoItemCompleto[] = [];
  totalProdutos: number = 0;
  cepDestino: string = '';
  opcaoFrete: OpcaoFrete | null = null;
  calculandoFrete: boolean = false;

  private subs: Subscription = new Subscription();

  constructor(
    private carrinhoService: CarrinhoService,
    private produtoService: ProdutoService,
    private freteService: FreteService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    const usuario = this.usuarioService.usuarioLogado;
    if (!usuario) return;

    this.subs.add(
      this.carrinhoService.itensCarrinho$.subscribe((itens) => {
        const itensDoUsuario = itens.filter((i) => i.usuarioId === usuario.id);
        this.itensVisiveis = [];
        this.totalProdutos = 0;

        const observables = itensDoUsuario.map((item) =>
          this.produtoService
            .getProdutoPorId(item.produtoId)
            .pipe(map((produto: Produto) => ({ item, produto })))
        );

        if (observables.length > 0) {
          forkJoin(observables).subscribe(
            (resultados: { item: CarrinhoItem; produto: Produto }[]) => {
              let novoTotal = 0;
              this.itensVisiveis = resultados.map((r: { item: CarrinhoItem; produto: Produto }) => {
                novoTotal += r.produto.preco * r.item.quantidade;
                return {
                  itemId: r.item.id!,
                  produto: r.produto,
                  tamanho: r.item.tamanho,
                  quantidade: r.item.quantidade,
                };
              });
              this.totalProdutos = novoTotal;
            }
          );
        }
      })
    );

    this.carrinhoService.carregarItensDoServidor(usuario.id!).subscribe();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  removerDoCarrinho(itemId: number | undefined): void {
    const usuario = this.usuarioService.usuarioLogado;
    if (!usuario || itemId === undefined) return;
    this.carrinhoService.removerItem(itemId, usuario.id!).subscribe();
  }

  onClickCalcularFrete(): void {
    if (!this.cepDestino) {
      alert('Por favor, digite um CEP.');
      return;
    }
    this.carrinhoService.setCepDestino(this.cepDestino);
    this.calculandoFrete = true;
    this.opcaoFrete = null;
    this.freteService.calcularFrete(this.cepDestino).subscribe((resultado) => {
      this.calculandoFrete = false;
      if (resultado) {
        this.opcaoFrete = resultado;
      } else {
        alert('CEP inválido ou não encontrado.');
      }
    });
  }

  getTotalGeral(): number {
    const valorFrete = this.opcaoFrete ? this.opcaoFrete.valor : 0;
    return this.totalProdutos + valorFrete;
  }
}
