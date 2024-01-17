import { Component, OnInit } from '@angular/core';
import { MybookingService } from '../service/mybooking.service';
import { AuthService } from '../service/auth.service';
import { PaymentService } from '../service/payment.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-mybooking',
  templateUrl: './mybooking.component.html',
  styleUrls: ['./mybooking.component.css']
})
export class MybookingComponent implements OnInit{
  users: any = localStorage.getItem('user');
  loginUserinfo = JSON.parse(this.users);
  mybooking: any;
  display=true;
  show!:false;
  bookingId: any;
  constructor(private Book:MybookingService,public auth:AuthService,private pay:PaymentService,private service:ProductService){}
  ngOnInit(): void
  {
    this.Mybooking();
  }

Mybooking(){
  this.Book.getbookingbyuserid(this.loginUserinfo.userId).subscribe((res)=>
  {
    this.mybooking =res;
  }
  )
}
isUnpaid(status: string): boolean {
  return status === 'PAID';
}

  cancel(id:number){
    this.Book.deletebooking(id).subscribe((res)=>{
      this.Available(this.bookingId);
      alert("Booking deleted Successfully");
      this.Mybooking();
    })
  }
  Available(productId:any){
    console.warn(productId);
    this.service.IsAvailablecar(productId).subscribe((res)=>{
    })
  }
}
