import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamisasEuropa } from './camisas-europa';

describe('CamisasEuropa', () => {
  let component: CamisasEuropa;
  let fixture: ComponentFixture<CamisasEuropa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CamisasEuropa]
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
