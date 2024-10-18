import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosEmpresarialComponent } from './datos-empresarial.component';

describe('DatosEmpresarialComponent', () => {
  let component: DatosEmpresarialComponent;
  let fixture: ComponentFixture<DatosEmpresarialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosEmpresarialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosEmpresarialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
