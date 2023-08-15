import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardetailspageComponent } from './cardetailspage.component';

describe('CardetailspageComponent', () => {
  let component: CardetailspageComponent;
  let fixture: ComponentFixture<CardetailspageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardetailspageComponent]
    });
    fixture = TestBed.createComponent(CardetailspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
