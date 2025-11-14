import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { CarrinhoItem, CarrinhoService } from '../../services/carrinho';
import { ProdutoService } from '../../services/produto';
import { Produto } from '../../models/produto.model';
import { UsuarioService } from '../../services/usuario';
import { FreteService, OpcaoFrete } from '../../services/frete';
import Swal from 'sweetalert2';

export interface CarrinhoItemCompleto {
  itemId: number;
  produto: Produto;
  tamanho: string;
  quantidade: number;
}

@Component({
  selector: 'app-finalizar-compra',
  standalone: false,
  templateUrl: './finalizar-compra.html',
  styleUrls: ['./finalizar-compra.css']
})
export class FinalizarCompraComponent implements OnInit, OnDestroy {

  checkoutForm: FormGroup;
  itensVisiveis: CarrinhoItemCompleto[] = [];
  totalProdutos: number = 0;
  opcaoFrete: OpcaoFrete | null = null;

  private subs: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private carrinhoService: CarrinhoService,
    private produtoService: ProdutoService,
    private usuarioService: UsuarioService,
    private freteService: FreteService
  ) {
    this.checkoutForm = this.fb.group({
      // Dados do comprador
      nomeCompleto: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],

      // Endereço
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)]],
      rua: ['', Validators.required],
      numero: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],

      // Pagamento
      nomeCartao: ['', Validators.required],
      numeroCartao: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      validadeCartao: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]]
    });
  }

  get f() {
    return this.checkoutForm.controls;
  }

  ngOnInit(): void {
    const usuario = this.usuarioService.usuarioLogado;
    if (!usuario) return;

    // Pré-preenche nome e e-mail do usuário logado
    this.checkoutForm.patchValue({
      nomeCompleto: usuario.nome,
      email: usuario.email
    });

    // Pré-preenche o CEP vindo do carrinho (se existir)
    const cepCarrinho = this.carrinhoService.getCepDestino();
    if (cepCarrinho) {
      this.checkoutForm.patchValue({ cep: cepCarrinho });

      // Calcula frete
      this.freteService.calcularFrete(cepCarrinho).subscribe(resultado => {
        if (resultado) {
          this.opcaoFrete = resultado;
        }
      });
    }

    // Assina itens do carrinho e monta a lista visível com total
    this.subs.add(
      this.carrinhoService.itensCarrinho$.subscribe((itens: CarrinhoItem[]) => {
        const itensDoUsuario = itens.filter(i => i.usuarioId === usuario.id);
        this.itensVisiveis = [];
        this.totalProdutos = 0;

        const observables = itensDoUsuario.map(item =>
          this.produtoService.getProdutoPorId(item.produtoId).pipe(
            map((produto: Produto) => ({ item, produto }))
          )
        );

        if (observables.length > 0) {
          forkJoin(observables).subscribe((resultados: { item: CarrinhoItem, produto: Produto }[]) => {
            let novoTotal = 0;
            this.itensVisiveis = resultados.map((r: { item: CarrinhoItem, produto: Produto }) => {
              novoTotal += r.produto.preco * r.item.quantidade;
              return {
                itemId: r.item.id!,
                produto: r.produto,
                tamanho: r.item.tamanho,
                quantidade: r.item.quantidade
              };
            });
            this.totalProdutos = novoTotal;
          });
        } else {
          this.itensVisiveis = [];
          this.totalProdutos = 0;
        }
      })
    );

    this.carrinhoService.carregarItensDoServidor(usuario.id!).subscribe();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  getTotalGeral(): number {
    const valorFrete = this.opcaoFrete ? this.opcaoFrete.valor : 0;
    return this.totalProdutos + valorFrete;
  }

  onSubmit(): void {
    this.checkoutForm.markAllAsTouched();

    if (this.checkoutForm.invalid) {
      Swal.fire('Erro', 'Formulário inválido. Verifique os campos.', 'error');
      return;
    }

    Swal.fire('Sucesso', 'Compra finalizada com sucesso!', 'success');

    const usuario = this.usuarioService.usuarioLogado;
    if (usuario) {
      this.carrinhoService.limparCarrinho(usuario.id!).subscribe();
      this.opcaoFrete = null;
    }
  }
}



