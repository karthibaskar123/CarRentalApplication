import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from 'Environment/Environment';

@Injectable({
  providedIn: 'root'
})
export class MybookingService {

Paid:any;
  httpOptions =
  {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  constructor(private http : HttpClient) { }

  private myBooking = Environment.myBooking;


  AddBooking(data:FormData)
  {
     return this.http.post(this.myBooking,data);
  }
  GetAllBooking()
  {
    return this.http.get<any[]>(this.myBooking);
  }
  getbookingbyuserid(userid:any)
  {
    return this.http.get<any[]>(this.myBooking+"userid?id="+userid);
  }
  getbookingbyid(id:any)
  {
    return this.http.get<any>(this.myBooking+"Bookingid?Bookingid="+id);
  }
  deletebooking(bookingid:any)
  {
    return this.http.delete(this.myBooking+bookingid);
  }
  statusupdate(bookingid:number)
  {
    console.log(bookingid)
    const modifiedUser: any= [

      { op: "replace", path: "/status", value: "PAID" }
    ];
    return this.http.patch(this.myBooking + bookingid + '/status', modifiedUser, this.httpOptions);
  }


}
