import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamisasBrasileirao } from './camisas-brasileirao';

describe('CamisasBrasileirao', () => {
  let component: CamisasBrasileirao;
  let fixture: ComponentFixture<CamisasBrasileirao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CamisasBrasileirao]
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
