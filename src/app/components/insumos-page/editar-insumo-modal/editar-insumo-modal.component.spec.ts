import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarInsumoModalComponent } from './editar-insumo-modal.component';

describe('EditarInsumoModalComponent', () => {
  let component: EditarInsumoModalComponent;
  let fixture: ComponentFixture<EditarInsumoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EditarInsumoModalComponent]
    });
    fixture = TestBed.createComponent(EditarInsumoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
