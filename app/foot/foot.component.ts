import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-foot',
  templateUrl: './foot.component.html',
  styleUrls: ['./foot.component.css']
})
export class FootComponent {

  ismenerequired= false ;

  constructor(private router:Router){}

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
  }
