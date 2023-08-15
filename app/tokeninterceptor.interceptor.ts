import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class TokeninterceptorInterceptor implements HttpInterceptor {

  constructor(private authservice:AuthService,private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token=this.authservice.getToken();
    if(token){
      request=request.clone({setHeaders:{Authorization:'CarRental'}})
    }
    return next.handle(request).pipe(
      catchError((error:any)=>
      {
        if(error instanceof HttpErrorResponse)
        {
          if(error.status === 401)
          {
            alert("Token is Expired, Login again")
            this.router.navigate(['login'])
          }
        }
        return throwError(()=> new Error("Something Went Wrong"))
      })
    );
  }
}
