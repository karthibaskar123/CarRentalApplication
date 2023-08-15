import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcarsComponent } from './listcars.component';

describe('ListcarsComponent', () => {
  let component: ListcarsComponent;
  let fixture: ComponentFixture<ListcarsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListcarsComponent]
    });
    fixture = TestBed.createComponent(ListcarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
