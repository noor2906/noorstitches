import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPagoPageComponent } from './gestion-pago-page.component';

describe('GestionPagoPageComponent', () => {
  let component: GestionPagoPageComponent;
  let fixture: ComponentFixture<GestionPagoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionPagoPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionPagoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
