import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaProductoModalComponent } from './crea-producto-modal.component';

describe('CreaProductoModalComponent', () => {
  let component: CreaProductoModalComponent;
  let fixture: ComponentFixture<CreaProductoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreaProductoModalComponent]
    });
    fixture = TestBed.createComponent(CreaProductoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
