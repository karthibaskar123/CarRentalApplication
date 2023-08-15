import { Component, OnInit } from '@angular/core';
import { MybookingService } from '../service/mybooking.service';
import { AuthService } from '../service/auth.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit{
  users: any = localStorage.getItem('user');
  loginUserinfo = JSON.parse(this.users);
  mybooking: any;
  icon = faTrash;
  page:number=1;
  itemsPerPage:number=5;
  totalcars:any;
  searchtext:any;

  constructor(private book:MybookingService,public auth:AuthService){}
  ngOnInit(): void
  {
      this.Mybooking();
  }

  Mybooking()
  {
    this.book.getbookingbyuserid(this.loginUserinfo.userId).subscribe((res)=>{
      this.mybooking =res;
      console.log(res);
    })
  }

  cancel(id:number)
  {
    this.book.deletebooking(id).subscribe((res)=>{
      alert("Booking deleted Successfully");
      this.Mybooking();
    })
  }
}

