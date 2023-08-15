import { Component, OnInit,Input } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { HttpClient } from '@angular/common/http';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {
  users!:any;
  icon = faTrash;
  editicon = faEdit;
  searchtext:any;
  constructor(private auth: AuthService) {}

  ngOnInit(): void
  {
    this.userlist();
  }
  delete(user:any)
  {
    this.auth.deleteUser(user).subscribe(res=>{

      alert("user deleted successfully");
      this.userlist();
    },
    error=>{
      alert(JSON.stringify(error))
    })
  }
  userlist()
  {
    this.auth.GetAllUsers().subscribe((res=>{
      this.users = res;

    }))
  }

}


