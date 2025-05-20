import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirigiendoPageComponent } from './redirigiendo-page.component';

describe('RedirigiendoPageComponent', () => {
  let component: RedirigiendoPageComponent;
  let fixture: ComponentFixture<RedirigiendoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedirigiendoPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedirigiendoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
