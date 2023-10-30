import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaInsumosComponent } from './tabla-insumos.component';

describe('TablaInsumosComponent', () => {
  let component: TablaInsumosComponent;
  let fixture: ComponentFixture<TablaInsumosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TablaInsumosComponent]
    });
    fixture = TestBed.createComponent(TablaInsumosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
