import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaRubroProductoModalComponent } from './crea-rubro-producto-modal.component';

describe('CreaRubroProductoModalComponent', () => {
  let component: CreaRubroProductoModalComponent;
  let fixture: ComponentFixture<CreaRubroProductoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreaRubroProductoModalComponent]
    });
    fixture = TestBed.createComponent(CreaRubroProductoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
