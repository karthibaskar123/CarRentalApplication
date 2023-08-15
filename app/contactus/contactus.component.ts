import { Component, OnInit } from '@angular/core';
import { ContactService } from '../service/contact.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  contact!:FormGroup;
  constructor(private service:ContactService,private formbuilder:FormBuilder){}
  ngOnInit(): void {
    this.contact = this.formbuilder.group({

      name:"",
      email:"",
      message:""
    })


  }
submit(){
  this.service.get(this.contact.value).subscribe((res=>{
    this.contact.setValue({
      name:"",
      email:"",
      message:""
    })
  }));
}

}
