import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CamisasBrasileirao } from './camisas-brasileirao';

import { ProdutoService } from '../../services/produto';
import { CarrinhoService } from '../../services/carrinho.service';

   //Retorna um array vazio para teste
class MockProdutoService {
  getProdutosBrasileirao() {
    return [];
  }
}

class MockCarrinhoService {
  adicionarItem(produto: any, tamanho: string) {
    // Não faz nada, é só um mock
  }
}

describe('CamisasBrasileirao', () => {
  let component: CamisasBrasileirao;
  let fixture: ComponentFixture<CamisasBrasileirao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CamisasBrasileirao],
      // Fornecer os Mocks para o TestBed
      providers: [
        { provide: ProdutoService, useClass: MockProdutoService },
        { provide: CarrinhoService, useClass: MockCarrinhoService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CamisasBrasileirao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
