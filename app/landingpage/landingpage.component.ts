import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { OfferService } from '../service/offer.service';
import { Product } from 'data-type';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {
  seachkey:string="";
  Searchproduct:undefined|Product[];
  trendingcars:any;
  public filterCategory : any
  filterapply=false;
  page:number=1;
  itemsPerPage:number=5;
  totalcars:any;
  users: any = localStorage.getItem('user');
  loginUserinfo = JSON.parse(this.users);
  cardata:any;
  Product!:Product;
  constructor(private activeroute:ActivatedRoute,private service: ProductService,public offer:OfferService){}

  ngOnInit(): void
  {
      this.trendingcarsmethod();
      this.service.search.subscribe((val:any)=>{
        this.seachkey = val;
      });
      let query= this.activeroute.snapshot.paramMap.get(`query`)
    query && this.service.searchproduct(query).subscribe((result)=>{
      this.filterCategory=result;
    });

  }

  trendingcarsmethod()
  {
    this.service.GetAllCars().subscribe((data)=>{

      this.trendingcars=data;
      this.filterCategory=data;
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
  filter(category:string)
  {
    this.filterCategory = this.trendingcars
    .filter((value:any)=>{
      if(value.category === category || category==='')
      {

        this.filterapply = true;

        return value;

      }
    })
  }

  filter1(type:string)
  {
    this.filterCategory = this.trendingcars
    .filter((value:any)=>{
      if(value.type === type || type==='')
      {

        this.filterapply = true;

        return value;

      }
    })
  }
  filter2(color:string)
  {
    this.filterCategory = this.trendingcars
    .filter((value:any)=>{
      if(value.color === color || color==='')
      {

        this.filterapply = true;

        return value;

      }
    })
  }
  filter3(enginetype:string)
  {
    this.filterCategory = this.trendingcars
    .filter((value:any)=>{
      if(value.enginetype === enginetype || enginetype==='')
      {

        this.filterapply = true;

        return value;

      }
    })
  }
  filter4(transmissiontype:string)
  {
    this.filterCategory = this.trendingcars
    .filter((value:any)=>{
      if(value.transmissiontype === transmissiontype || transmissiontype==='')
      {

        this.filterapply = true;

        return value;

      }
    })
  }


  isloggedIn() : boolean
  {

    return !!localStorage.getItem('token')
  }
  searchtext:string='';
  onsearchtextEnter(data:string)
  {
    this.searchtext=data;

    this.trendingcarsmethod();

  }

}
