import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  registerform!: FormGroup;

  constructor(private _formbuilder:FormBuilder, private _auth: AuthService){}

  ngOnInit(): void {
    this.registerform = this._formbuilder.group({
      firstName:['',[ Validators.required, Validators.pattern(/^(?!.*(.)\1{2})[a-zA-Z]+$/)]],
      lastName:['', [Validators.required, Validators.pattern(/^(?!.*(.)\1{2})[a-zA-Z]+$/)]],
      phoneNumber:['',[Validators.required, Validators.pattern(/^9\d{9}$/)]],
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required,Validators.pattern(/^(?!.*(.)\1{3}).*(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])/)]]
    })
  }


  register(usersignup:any)
  {
    this._auth.signup(usersignup.value)
    this.registerform.reset()
  }
}
