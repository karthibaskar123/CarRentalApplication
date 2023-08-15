import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { OfferService } from '../service/offer.service';
import { Product } from 'data-type';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{


  trendingcars:any[]=[];
  trendingcarsLimit: number = 3;
  Popularcars:any;
  filterCategory:any;
  users: any = localStorage.getItem('user');
  loginUserinfo = JSON.parse(this.users);
  cardata:any;
  Product!:Product;
  Email:string='';
  searchresult: any;
  searchTerm: any;
  username:any;

  constructor(private service: ProductService,public offer:OfferService,private router:Router,public auth:AuthService,private HttpClient:HttpClient){}

 ngOnInit(): void {
this.trendingcarsmethod();


 }

 trendingcarsmethod()
 {
this.service.Popularcars().subscribe((data)=>{
  this.Popularcars=data;
  this.filterCategory=data;
});
 }

 isloggedIn() : boolean
  {
    return !!localStorage.getItem('token')
  }
  filter(category:string)
  {
    this.filterCategory = this.Popularcars
    .filter((data:any)=>{
      if(data.category === category || category==='')
      {


        return data;

      }
    })
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

searchevent(query: KeyboardEvent) {
  if (query) {
    const element = query.target as HTMLInputElement;
    this.service.searchproduct(element.value).subscribe((result) =>
    {
      if (result.length > 5) {
        result.length = length;
      }
       this.searchresult = result;
       console.log(result);
    });
  }
}
redirectToDetails(productId:string){
  this.router.navigate(['/cardetails/'+ productId])

}

hidesearch() {
  this.searchresult = undefined;
}
submitsearch(value: string) {

  this.router.navigate([`newlandingpage/${value}`]);
}



}
