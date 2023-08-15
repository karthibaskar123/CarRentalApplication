import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Product } from 'data-type';
import { Environment } from 'Environment/Environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public search = new BehaviorSubject<string>("");
  userdata:any;
  httpOptions =
  {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  cartitemlist!: any[];
  cartproductlist: any;

  constructor(private http : HttpClient,private auth:AuthService) { }

  private cars=Environment.cars;
  private authUser=Environment.authUser;

  AddCars(data:FormData)
  {
     return this.http.post(this.cars,data);
  }
  GetAllCars()
  {
    return this.http.get<any[]>(this.cars);
  }
  getcarbyid(productId:any)
  {
    return this.http.get<any>(this.cars+productId);
  }
  updatecars(productId:number,data:FormData):Observable<any>
  {
      return this.http.put<any>(`${this.cars}`+productId,data);
  }
  deletecar(productId:number)
  {
    return this.http.delete(this.cars+productId);
  }

  Trendingcars()
  {
    const url = `${this.cars}`;
    return this.http.get<any[]>(url);
  }
  Popularcars()
  {
    const url = `${this.cars}`;
    return this.http.get<any[]>(url);
  }
  searchproduct(query:string):Observable<Product[]>{
    return this.http.get<Product[]>(`${this.cars}search?data=${query}`);
   }

  addToCart(userId:any, product: any)
  {
    console.warn(userId)

    const myProducts = {
      productId:product.productId,
      brandName:product.brandName,
      modelName:product.modelName,
      pricePerDay:product.pricePerDay,
      kilometersDriven:product.kilometersDriven,
      transmissionType:product.transmissionType,
      engineType:product.engineType,
      category:product.category,
      type:product.type,
      description:product.description,
      imagePath:product.imagePath,
      refundAmount:product.refundAmount,
      color:product.color,
      location:product.location,
      carAddress:product.carAddress,
      isAvailable:product.isAvailable}
    const body = [{op:'add',path:'/favorites/-', value:myProducts}];
    console.warn(body);
    return this.http.patch(this.authUser +"/"+ userId + '/favorite', body, this.httpOptions);
  }

removeallcart(){
  this.cartitemlist=[];
  this.cartproductlist.next(this.cartitemlist);
 }

 Availablecar(productId:number)
 {
   console.log(productId)
   const modifiedUser: any= [

     { op: "replace", path: "/isAvailable", value: "False" }
   ];
   return this.http.patch(this.cars + productId + '/available', modifiedUser, this.httpOptions);
  }


}




