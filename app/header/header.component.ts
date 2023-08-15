import { Component, DoCheck, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ProductService } from '../service/product.service';
import { faCar, faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit ,DoCheck{
Email:string='';
searchresult: any;
searchTerm: any;
username:any;
ismenerequired!: boolean;
icon =faHeart;
icon1=faCar;
users: any = localStorage.getItem('user');
loginUserinfo = JSON.parse(this.users);


constructor(private router:Router,public auth:AuthService,private product:ProductService){}
ngOnInit(): void {
 this.auth.GetAllUsers().subscribe(res=>{
  this.username=res;
 });


}
  ngDoCheck(): void
  {
    let currenturl=this.router.url;
    if(currenturl=='/login'||currenturl=='/register')
        {
          this.ismenerequired=false;
        }
    else
        {
          this.ismenerequired=true;
        }
  }

  isloggedIn() : boolean
  {

    return !!localStorage.getItem('token')
  }
  logout(){
    this.auth.Logout();
  }
  Logout()
  {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

searchevent(query: KeyboardEvent) {
  if (query) {
    const element = query.target as HTMLInputElement;
    this.product.searchproduct(element.value).subscribe((result) =>
    {
      if (result.length > 5) {
        result.length = length;
      }
      this.searchresult = result;
    });
  }
}
redirectToDetails(productid:string){
  this.router.navigate(['/cardetails/'+ productid])

}

hidesearch() {
  this.searchresult = undefined;
}
submitsearch(value: string) {
  this.router.navigate([`newlandingpage/${value}`]);
}

}
