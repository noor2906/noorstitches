import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoriasPageComponent } from './subcategorias-page.component';

describe('SubcategoriasPageComponent', () => {
  let component: SubcategoriasPageComponent;
  let fixture: ComponentFixture<SubcategoriasPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubcategoriasPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubcategoriasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
