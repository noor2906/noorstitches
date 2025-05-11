import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiendaPageComponent } from './tienda-page.component';

describe('TiendaPageComponent', () => {
  let component: TiendaPageComponent;
  let fixture: ComponentFixture<TiendaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiendaPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiendaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
