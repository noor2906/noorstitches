import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoExitosoPageComponent } from './pago-exitoso-page.component';

describe('PagoExitosoPageComponent', () => {
  let component: PagoExitosoPageComponent;
  let fixture: ComponentFixture<PagoExitosoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagoExitosoPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagoExitosoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
