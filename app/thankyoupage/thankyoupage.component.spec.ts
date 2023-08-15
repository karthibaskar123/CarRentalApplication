import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankyoupageComponent } from './thankyoupage.component';

describe('ThankyoupageComponent', () => {
  let component: ThankyoupageComponent;
  let fixture: ComponentFixture<ThankyoupageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThankyoupageComponent]
    });
    fixture = TestBed.createComponent(ThankyoupageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
