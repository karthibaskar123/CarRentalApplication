import { Component, OnInit } from '@angular/core';
import { MybookingService } from '../service/mybooking.service';
import { AuthService } from '../service/auth.service';
import { PaymentService } from '../service/payment.service';

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
  constructor(private Book:MybookingService,public auth:AuthService,private pay:PaymentService){}
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
      alert("Booking deleted Successfully");
      this.Mybooking();
    })
  }

}
