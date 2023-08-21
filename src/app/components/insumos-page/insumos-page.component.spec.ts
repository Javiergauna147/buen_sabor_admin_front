import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsumosPageComponent } from './insumos-page.component';

describe('InsumosPageComponent', () => {
  let component: InsumosPageComponent;
  let fixture: ComponentFixture<InsumosPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InsumosPageComponent]
    });
    fixture = TestBed.createComponent(InsumosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
