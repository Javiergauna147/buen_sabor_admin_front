import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPedidoModalComponent } from './editar-pedido-modal.component';

describe('EditarPedidoModalComponent', () => {
  let component: EditarPedidoModalComponent;
  let fixture: ComponentFixture<EditarPedidoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EditarPedidoModalComponent]
    });
    fixture = TestBed.createComponent(EditarPedidoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
