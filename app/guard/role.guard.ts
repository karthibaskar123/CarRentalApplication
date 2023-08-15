import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouteReuseStrategy, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private auth:AuthService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
    let jwt:any = localStorage.getItem('token');
    let jwtData = jwt.split('.')[1];
    let decodedJwtJsonData = window.atob(jwtData)
    let decodedJwtData = JSON.stringify(decodedJwtJsonData)
    let isAdmin = decodedJwtData.includes(route.data['role']);
    console.log('jwtData: ' + jwtData)
    console.log('decodedJwtJsonData: ' + decodedJwtJsonData)
    console.log('decodedJwtData: ' + decodedJwtData)
    console.log('Is admin: ' + isAdmin)

    if(isAdmin === true)
    {
      return true
    }
    else
    {
      this.router.navigate(['/home'])
      return false
    }
  }

}
