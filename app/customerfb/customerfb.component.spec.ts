import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerfbComponent } from './customerfb.component';

describe('CustomerfbComponent', () => {
  let component: CustomerfbComponent;
  let fixture: ComponentFixture<CustomerfbComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerfbComponent]
    });
    fixture = TestBed.createComponent(CustomerfbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
