import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRolModalComponent } from './crear-rol-modal.component';

describe('CrearRolModalComponent', () => {
  let component: CrearRolModalComponent;
  let fixture: ComponentFixture<CrearRolModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CrearRolModalComponent]
    });
    fixture = TestBed.createComponent(CrearRolModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
