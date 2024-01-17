import { Component, OnInit } from '@angular/core';
import { OfferService } from '../service/offer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MybookingService } from '../service/mybooking.service';
import { combineLatest } from 'rxjs';
import { Product } from '../../../data-type';

@Component({
  selector: 'app-rentalpage',
  templateUrl: './rentalpage.component.html',
  styleUrls: ['./rentalpage.component.css']
})
export class RentalpageComponent implements OnInit {
  BookingList:any;
  productId:any;
  bookingData!:FormGroup;
  productdata:any;
  status="UNPAID";
  selectedFile!:File;

  users: any = localStorage.getItem('user');
  loginUserinfo = JSON.parse(this.users);

  Days:any;
  currentdate:any = new Date();

  date = new Date();
  currentYear=this.date.getUTCFullYear();
  currentMonth=this.date.getUTCMonth() +1;
  currentday=this.date.getUTCDate();

  Todaysdate:any;
  FinalMonth : any;
  FinalDay:any;
  totalamount:any;
  rentalamount:any;

  constructor(public offer:OfferService,private myrouter:Router,private route:ActivatedRoute,private fb:FormBuilder,private http:HttpClient,private book:MybookingService,private service:ProductService){}

  ngOnInit(): void {

    if(this.currentMonth<10){
      this.FinalMonth = "0"+this.currentMonth;
    }else{
      this.FinalMonth=this.currentMonth;
    }
    if(this.currentday<10){
      this.FinalDay = "0"+this.currentday;
    }else{
      this.FinalDay=this.currentday;
    }
    this.Todaysdate=this.currentYear+"-"+this.FinalMonth+"-"+this.FinalDay;

    let productid = this.route.snapshot.paramMap.get('productid')
    productid && this.service.getcarbyid(productid).subscribe((result)=>{
        this.productdata=result;
    });

    this.bookingData = this.fb.group({
      rentDate:['',[Validators.required]],
      returnDate:['',[Validators.required]],
      shippingType:['',[Validators.required]],
      drivingLicenceImage:['',[Validators.required]],
      customerAddress: ['', [Validators.required, Validators.maxLength(200)]],
      drivingLicenceNumber: ['',[Validators.required,Validators.pattern(/^[A-Z]{2}\d{2}\s\d{11}$/)]],
    });

  }


  onSubmit()
  {
    const formData: FormData = new FormData();
    formData.append('userid',this.loginUserinfo.userId);
    formData.append('productid',this.productdata.productId);
    formData.append('Brandname', this.productdata.brandName);
    formData.append('Modelname', this.productdata.modelName);
    formData.append('priceperday', this.productdata.pricePerDay);
    formData.append('kmdriven', this.productdata.kilometersDriven);
    formData.append('Transmissiontype', this.productdata.transmissionType);
    formData.append('Enginetype', this.productdata.engineType);
    formData.append('Type', this.productdata.type);
    formData.append('Description', this.productdata.description);
    formData.append('Category', this.productdata.category);
    formData.append('RefundAmount', this.productdata.refundAmount);
    formData.append('color', this.productdata.color);
    formData.append('Location', this.productdata.location);
    formData.append('CarAddress', this.productdata.carAddress);
    formData.append('ImagePath',this.productdata.imagePath);
    formData.append('RentalDays', this.Days);
    formData.append('RentDate', this.bookingData.value.rentDate);
    formData.append('ReturnDate', this.bookingData.value.returnDate);
    formData.append('ShippingType', this.bookingData.value.shippingType);
    formData.append('CustomerAddress', this.bookingData.value.customerAddress);
    formData.append('DrivingLicenceNumber',this.bookingData.value.drivingLicenceNumber);
    formData.append('RentalAmount', this.rentalamount);
    formData.append('TotalAmount', this.totalamount);
    formData.append('Status',this.status);

    if (this.selectedFile) {
      formData.append('DrivingLicenceImage', this.selectedFile, this.selectedFile.name);
    }
    formData.forEach((value, key) => {
      console.log(value,key);
    });

    this.book.AddBooking(formData).subscribe(
      (response:any) => {
        // this.Available(this.productId);
        // console.log(this.productId)
        alert("Product Booked Successfully Complete Payment to Start Trip"+response.bookingId)
        this.Available(this.productdata.productId);
        this.myrouter.navigate(['/payment/'+response.bookingId]);
        this.bookingData.reset();
      },
      error => {
        console.error('Error Occur At Booking , Please provide valid data', error);
      }
    )
  }

    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0];
    }


Available(productId:any){
  console.warn(productId);
  this.service.Availablecar(productId).subscribe((res)=>{
  })
}
calculate()
{
  const date1Modified = new Date(this.bookingData.value.rentDate);
  const date2Modified = new Date(this.bookingData.value.returnDate);
  const Time = Math.abs(date2Modified.getTime() - date1Modified.getTime());
    this.Days=Time/(1000*3600*24)
    if(!this.offer.isoffervalid==true)
    {
    //   this.rentalamount = this.productdata.priceperday*this.Days;
    //   if(this.BookingData.value.ShippingType == "DoorDelivery"){
    //     this.totalamount =  this.rentalamount + Number(this.productdata.refundAmount) + 50;

    //   }
    //   else{
    //     this.totalamount =  this.rentalamount + Number(this.productdata.refundAmount);
    //   }

    // }
    // else{
      this.rentalamount = (this.productdata.pricePerDay)*this.Days;
      if(this.bookingData.value.shippingType == "DoorDelivery"){
        this.totalamount =  this.rentalamount + Number(this.productdata.refundAmount) + 50;

      }
      else{
        this.totalamount =  this.rentalamount + Number(this.productdata.refundAmount);
      }

    }
  }
}


