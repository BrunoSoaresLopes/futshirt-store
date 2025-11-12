import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CamisasEuropa } from './camisas-europa';

// Importar os serviços dos quais o componente depende
import { ProdutoService } from '../../services/produto';
import { CarrinhoService } from '../../services/carrinho.service';

// Criar "Mocks" (versões falsas) dos serviços para os testes
class MockProdutoService {
  getProdutosEuropa() { // Método específico desta classe
    return []; // Simplesmente retorna um array vazio para o teste
  }
}

class MockCarrinhoService {
  adicionarItem(produto: any, tamanho: string) {
    // Não faz nada, é só um mock
  }
}

describe('CamisasEuropa', () => {
  let component: CamisasEuropa;
  let fixture: ComponentFixture<CamisasEuropa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CamisasEuropa],
      // Fornecer os Mocks para o TestBed
      providers: [
        { provide: ProdutoService, useClass: MockProdutoService },
        { provide: CarrinhoService, useClass: MockCarrinhoService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CamisasEuropa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
