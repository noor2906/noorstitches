import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoCanceladoPageComponent } from './pago-cancelado-page.component';

describe('PagoCanceladoPageComponent', () => {
  let component: PagoCanceladoPageComponent;
  let fixture: ComponentFixture<PagoCanceladoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagoCanceladoPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagoCanceladoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
