import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarservicepageComponent } from './carservicepage.component';

describe('CarservicepageComponent', () => {
  let component: CarservicepageComponent;
  let fixture: ComponentFixture<CarservicepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarservicepageComponent]
    });
    fixture = TestBed.createComponent(CarservicepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
