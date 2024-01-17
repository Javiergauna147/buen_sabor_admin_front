import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguroEliminarModalComponent } from './seguro-eliminar-modal.component';

describe('SeguroEliminarModalComponent', () => {
  let component: SeguroEliminarModalComponent;
  let fixture: ComponentFixture<SeguroEliminarModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SeguroEliminarModalComponent]
    });
    fixture = TestBed.createComponent(SeguroEliminarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
