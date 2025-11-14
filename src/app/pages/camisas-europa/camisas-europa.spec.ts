import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CamisasEuropa } from './camisas-europa';

import { ProdutoService } from '../../services/produto';
import { CarrinhoService } from '../../services/carrinho';

class MockProdutoService {
  getProdutosEuropa() {
    return [];
  }
}

class MockCarrinhoService {
  adicionarItem(produto: any, tamanho: string) {
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
