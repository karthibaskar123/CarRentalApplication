import { Component, OnInit } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../service/auth.service';
import { HttpClient } from '@angular/common/http';
import { ContactService } from '../service/contact.service';

@Component({
  selector: 'app-customerfb',
  templateUrl: './customerfb.component.html',
  styleUrls: ['./customerfb.component.css']
})
export class CustomerfbComponent implements  OnInit {
  users!:any;
  icon = faTrash;
  editicon = faEdit;
  searchtext:any;

  constructor(private service:ContactService) {}

  ngOnInit(): void
  {
    this.userlist();
  }
  delete(user:any)
  {
    this.service.delete(user).subscribe(res=>{
      alert("user deleted successfully");
      this.userlist();
    },
    error=>{
      alert(JSON.stringify(error))
    })
  }
  userlist()
  {
    this.service.getall().subscribe((res=>{
      this.users = res;
    }))
  }
}

