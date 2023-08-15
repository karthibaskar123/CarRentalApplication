import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecarsdetailsComponent } from './updatecarsdetails.component';

describe('UpdatecarsdetailsComponent', () => {
  let component: UpdatecarsdetailsComponent;
  let fixture: ComponentFixture<UpdatecarsdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatecarsdetailsComponent]
    });
    fixture = TestBed.createComponent(UpdatecarsdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
