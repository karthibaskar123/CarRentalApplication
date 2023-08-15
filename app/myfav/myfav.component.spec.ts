import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyfavComponent } from './myfav.component';

describe('MyfavComponent', () => {
  let component: MyfavComponent;
  let fixture: ComponentFixture<MyfavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyfavComponent]
    });
    fixture = TestBed.createComponent(MyfavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
