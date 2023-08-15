import { Component, OnInit } from '@angular/core';
import { OfferService } from '../service/offer.service';
import { ProductService } from '../service/product.service';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-myfav',
  templateUrl: './myfav.component.html',
  styleUrls: ['./myfav.component.css']
})
export class MyfavComponent implements OnInit {
  product:any=[];
  trendingcars: any[]=[];
  users: any = localStorage.getItem('user');
  loginUserinfo = JSON.parse(this.users);
  fav:any;
  favorites:any;
  productdata:any;
  constructor(private service: ProductService,public offer:OfferService,public auth:AuthService,private route:ActivatedRoute){}
  ngOnInit(): void {

    this.trendingcarsmethod();
    this.myfavlist();
    let productid = this.route.snapshot.paramMap.get('productid')
    productid && this.service.getcarbyid(productid).subscribe((result)=>{
        this.productdata=result;
    });
  }
  trendingcarsmethod()
  {
   const limit=1;
   this.service.Trendingcars().subscribe((data)=>{
     this.trendingcars=data;
 });
  }
  isloggedIn() : boolean
  {
    return !!localStorage.getItem('token')
  }


  myfavlist()
  {
    this.auth.getbyuserid(this.loginUserinfo.userId).subscribe((res)=>{
      this.favorites=res;
        this.fav=this.favorites.favorites;
       
    })
  }
  delete(id:number){
    this.auth.removeFromfav(id).subscribe(res=>{
      alert("Item deleted Successfully");
      this.myfavlist();
    });
}
}


