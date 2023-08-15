import { HttpClient } from '@angular/common/http';
import { ProductService } from './../service/product.service';
import { Component, OnInit ,Input} from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { OfferService } from '../service/offer.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';


@Component({
  selector: 'app-listcars',
  templateUrl: './listcars.component.html',
  styleUrls: ['./listcars.component.css']
})


export class ListcarsComponent implements OnInit{


  products!:any[]
  icon = faTrash;
  editicon = faEdit;
  searchtext:any;
  page:number=1;
  itemsPerPage:number=5;
  totalcars:any;


  constructor(private productService: ProductService,private http:HttpClient,public offer:OfferService) {}

  ngOnInit(): void
  {
    this.carslist();
  }
  delete(car:any)
  {
    this.productService.deletecar(car).subscribe(result=>{
      console.warn(result);
      alert("product deleted successfully");
      this.carslist();
    },
    error=>{
      alert(JSON.stringify(error))
    })
  }
  carslist()
  {
    this.productService.GetAllCars().subscribe((result=>{
      this.products = result;
      this.totalcars= result.length;
      console.warn(result);
    }))
  }
}




