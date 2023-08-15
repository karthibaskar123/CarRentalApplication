import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertmessageService } from './service/alertmessage.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ExceptioninterceptorInterceptor implements HttpInterceptor {
  constructor(private alertify: AlertmessageService,private toastr: ToastrService){}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) =>
      {
        const errorMessage = this.setError(error);
        console.log(error);
        // this.toastr.error("Invalid Data", 'Error');
        // this.alertify.error(error.error);
        // alert('Invalid Data')
        return throwError(errorMessage);
      })
      );
      }
  setError(error: HttpErrorResponse): string {
    let errorMessage = 'Unknown error occured';
    if(error.error instanceof ErrorEvent) {

        errorMessage = error.error.message;
    } else {

        if (error.status!==0) {
            errorMessage = error.error.errorMessage;
        }
    }
    return errorMessage;
}
}

