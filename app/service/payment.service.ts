import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../Environment/Environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService   {
  httpOptions =
{
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

constructor(private http : HttpClient) { }

private payment=Environment.payment;

Payment(data:FormData)
{
   return this.http.post(this.payment,data);
}
GetAllpayment()
{
  return this.http.get<any[]>(this.payment);
}
getpaymentbyid(userid:any)
{
  return this.http.get<any[]>(this.payment+"userid?id="+userid);
}
deletebooking(paymentid:any)
{
  return this.http.delete(this.payment+paymentid);
}
}
