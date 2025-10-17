import { TestBed } from '@angular/core/testing';

import { Produto } from '../models/produto.model';
import { ProdutoService } from './produto';

// Mude o nome aqui para refletir o serviço
describe('ProdutoService', () => {
  let service: ProdutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
