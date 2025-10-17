import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SobreNosComponent } from './sobre-nos';

describe('SobreNos', () => {
  let component: SobreNos;
  let fixture: ComponentFixture<SobreNos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SobreNos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SobreNos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
