import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRubroInsumoModalComponent } from './crear-rubro-insumo-modal.component';

describe('CrearRubroInsumoModalComponent', () => {
  let component: CrearRubroInsumoModalComponent;
  let fixture: ComponentFixture<CrearRubroInsumoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CrearRubroInsumoModalComponent]
    });
    fixture = TestBed.createComponent(CrearRubroInsumoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
