import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProdutosComponent } from './admin-produtos';

describe('AdminProdutos', () => {
  let component: AdminProdutosComponent;
  let fixture: ComponentFixture<AdminProdutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminProdutosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
