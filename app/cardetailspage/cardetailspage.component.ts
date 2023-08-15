import { Component, OnInit } from '@angular/core';
import { OfferService } from '../service/offer.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-cardetailspage',
  templateUrl: './cardetailspage.component.html',
  styleUrls: ['./cardetailspage.component.css']
})
export class CardetailspageComponent implements OnInit {
  productdata:any;
  users: any = localStorage.getItem('user');
  loginUserinfo = JSON.parse(this.users);
  cardata:any;
  constructor(public offer:OfferService,private route:ActivatedRoute,private service:ProductService){}
  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('productId')
    productId && this.service.getcarbyid(productId).subscribe((result)=>{
        this.productdata=result;
    });
  }
  cart(Product: any)
  {

      this.service.addToCart(this.loginUserinfo.userId, Product)
.subscribe(res =>
        {
          this.cardata= res;
          alert("Product Added Successfully.")

        },
        error =>
        {
          console.error(JSON.stringify(error));
        })

    }

}
