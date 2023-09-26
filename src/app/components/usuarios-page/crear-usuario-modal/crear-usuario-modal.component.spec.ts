import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearUsuarioModalComponent } from './crear-usuario-modal.component';

describe('CrearUsuarioModalComponent', () => {
  let component: CrearUsuarioModalComponent;
  let fixture: ComponentFixture<CrearUsuarioModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CrearUsuarioModalComponent]
    });
    fixture = TestBed.createComponent(CrearUsuarioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
