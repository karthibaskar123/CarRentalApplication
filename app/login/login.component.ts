import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
loginform!:FormGroup;
Admin:any;
Email:any;
constructor(private formbuilder:FormBuilder, private authService:AuthService){}

ngOnInit(): void {
  this.loginform = this.formbuilder.group
  ({
    email:['', [Validators.required, Validators.email]],
    password:['', [Validators.required,Validators.pattern(/^(?!.*(.)\1{3}).*(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])/)]]
  })
}

login(login:any)
{
  this.authService.userlogin(login.value);
  console.log(login.value);
  this.loginform.reset();
}
}
