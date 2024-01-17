import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OfferService } from '../service/offer.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';
import { MybookingService } from '../service/mybooking.service';
import { PaymentService } from '../service/payment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-paymentpage',
  templateUrl: './paymentpage.component.html',
  styleUrls: ['./paymentpage.component.css']
})
export class PaymentpageComponent  implements OnInit {

  users: any = localStorage.getItem('user');
  loginUserinfo = JSON.parse(this.users);
  productdata:any;
  PaymentData!:FormGroup;
  payment:any;
  today: Date = new Date();
  BookingDate: string;
  DeliveryDate: string;
  bookingid:any;
  productId:any;

@ViewChild('paymentRef',{static:true})paymentRef!:ElementRef;

  constructor(private fb:FormBuilder,public offer:OfferService,private route:ActivatedRoute,private service:ProductService,private Book:MybookingService,private pay:PaymentService)
  {
    const today = new Date();
    this.BookingDate = today.toISOString().substr(0, 10);

    // Calculate delivery date (2 hours from now)
    const deliveryTime = today.getTime() + 2 * 60 * 60 * 1000; // Adding 2 hours in milliseconds
    const deliveryDateTime = new Date(deliveryTime);
    this.DeliveryDate = deliveryDateTime.toISOString().substr(0, 10);
  }


  ngOnInit(): void {

    // console.log(window.paypal);
    // window.paypal.Button().render(this.paymentRef);

    this.bookingid = this.route.snapshot.paramMap.get('bookingid')
    this.bookingid && this.Book.getbookingbyid(this.bookingid).subscribe((result)=>{
        this.productdata=result;
        console.log(this.productdata)
    });

    this.PaymentData = this.fb.group({
      cardNumber:['',[Validators.required, Validators.pattern(/^[0-9]{16}$/)]],
      cvv:['',[Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
      expiryDate:['',[Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
    });

  }

  Onsubmit() {
    this.bookingid && this.Book.getbookingbyid(this.bookingid).subscribe((result)=>{
      this.productdata=result;


    const formData: FormData = new FormData();
    formData.append('userid',this.loginUserinfo.userId);
    formData.append('bookingid',this.bookingid);
    formData.append('totalAmount',this.productdata[0].totalAmount);
    formData.append('DeliveryDate',this.DeliveryDate);
    formData.append('BookingDate',this.BookingDate);
    formData.append('cardnumber',this.PaymentData.value.cardNumber);
    formData.append('cvv',this.PaymentData.value.cvv);
    formData.append('expirydate',this.PaymentData.value.expiryDate);
    formData.forEach((value, key) => {
      console.log(key, value);
  });

    this.pay.Payment(formData).subscribe(
      response => {
        this.paymentstatus(this.bookingid);
        console.warn(this.productId);
        // this.Available(this.productId);
        alert("Payment Sucessfull")
      },
      error => {
        console.error('Error Occur At Booking , Please provide valid data', error);
      }
    )
  });
    }

    paymentstatus(bookingid:any){
      console.warn(bookingid);
      this.Book.statusupdate(bookingid).subscribe((res)=>{
      })
    }




  }

