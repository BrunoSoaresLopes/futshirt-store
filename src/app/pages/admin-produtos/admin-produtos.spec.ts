import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProdutos } from './admin-produtos';

describe('AdminProdutos', () => {
  let component: AdminProdutos;
  let fixture: ComponentFixture<AdminProdutos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminProdutos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProdutos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
