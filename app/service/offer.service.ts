import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  days:any;
  hours:any;
  mins:any;
  secs:any;
  isoffervalid:boolean=false;

  constructor() { }
  offer(){
this.isoffervalid=true;
  const x = setInterval(()=>{
    var futuredate =new Date("Augest 26,2023 15:57:07").getTime();
    var today= new Date().getTime();
    var balancetime= futuredate-today;
    this.days=Math.floor(balancetime/(1000*60*60*24));
    this.hours=Math.floor(balancetime%(1000*60*60*24)/(1000*60*60));
    this.mins=Math.floor(balancetime%(1000*60*60)/(1000*60));
    this.secs=Math.floor((balancetime%(1000*60))/(1000));
    if(balancetime<0){
      clearInterval(x);
      this.days="offer expired";
      this.isoffervalid=false;
    }
  },1000);
}

}
