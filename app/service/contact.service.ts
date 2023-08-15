import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Environment } from 'Environment/Environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  httpOptions={
    headers : new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  constructor(private http:HttpClient) { }

  private contact= Environment.contact;


  get(data:any){
    return this.http.post(this.contact,data);
  }

  getall(){
    return this.http.get(this.contact);
  }
  delete(id:any){
    return this.http.delete(this.contact + id)
  }
}
