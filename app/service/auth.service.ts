import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders}from '@angular/common/http'
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Environment } from 'Environment/Environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions =
  {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  Role:any;

  private authUser=Environment.authUser;

  constructor(private http:HttpClient,private router:Router) { }

  signup(users:any)
  {
    this.http.post<any>( this.authUser+  '/register', JSON.stringify(users), this.httpOptions).subscribe((result)=>
    {
      alert("register succeess")
    },
    error=>
    {
      alert(JSON.stringify(error))
    })
  }

  userlogin(login:any)
  {
    this.http.post( this.authUser+'/login', JSON.stringify(login), this.httpOptions).subscribe(res=>
    {
      alert("Logged in Successfully!");
      this.router.navigate(['']);
      this.token(JSON.stringify(res));
      this.http.get<any>(this.authUser,this.httpOptions).subscribe(res=>
      {
        const user=res.find((data:any)=>
        {
          return data.email === login.email && data.password === login.password;
        });
        if(user)
        {
          localStorage.setItem('user', JSON.stringify(user))
        }
      });
      this.Role = this.getRole();
    })
  }
  GetAllUsers()
  {
    return this.http.get(this.authUser);
  }
  deleteUser(userid:any)
  {
    return this.http.delete(this.authUser+"/"+userid);
  }
  removeFromfav(favid:number){
    return this.http.delete(this.authUser+"/"+favid);
   }

  Logout()
  {
    this.Role = this.getRole();
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  token(tokenValue: string)
  {
    localStorage.setItem('token', tokenValue)
  }


  getToken()
  {
    return localStorage.getItem('token');
  }

  isloggedIn() : boolean
  {
    return !!localStorage.getItem('token')
  }
  getRole()
  {
    let jwt:any = localStorage.getItem('token');
    let jwtData = jwt.split('.')[1];
    let decodedJwtJsonData = window.atob(jwtData)
    let decodedJwtData = JSON.stringify(decodedJwtJsonData)
    let isAdmin = decodedJwtData.includes('admin');
    console.log(isAdmin);
    console.log("log"+jwt)

    if(isAdmin === true)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  getbyuserid(userid:any)
  {
    return this.http.get(this.authUser+"/"+userid);
  }
}
