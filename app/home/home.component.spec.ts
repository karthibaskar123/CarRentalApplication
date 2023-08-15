import { ComponentFixture, TestBed } from '@angular/core/testing';
import{HttpClientTestingModule}from '@angular/common/http/testing'
import { HomeComponent } from './home.component';
import { ProductService } from '../service/product.service';
import { OfferService } from '../service/offer.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

fdescribe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      declarations: [HomeComponent],
      providers:[ProductService]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('it should get all cars',()=>{
    const service =fixture.debugElement.injector.get(ProductService);
    spyOn(service,'Popularcars').and.returnValue(of([{productid:2}]));
    component.trendingcarsmethod();
    expect(component.filterCategory).toEqual([{productid:2}]);
  });
});
