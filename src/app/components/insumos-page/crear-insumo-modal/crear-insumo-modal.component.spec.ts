import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearInsumoModalComponent } from './crear-insumo-modal.component';

describe('CrearInsumoModalComponent', () => {
  let component: CrearInsumoModalComponent;
  let fixture: ComponentFixture<CrearInsumoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CrearInsumoModalComponent]
    });
    fixture = TestBed.createComponent(CrearInsumoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
