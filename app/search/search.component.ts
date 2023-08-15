import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  ngOnInit(): void {

  }
  Searchdata:string='';
  @Output()
  searchtextchanges : EventEmitter<string> = new EventEmitter<string>();
  Onsearchtextchanged(){
  this.searchtextchanges.emit(this.Searchdata);
}
}
