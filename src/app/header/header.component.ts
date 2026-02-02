import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  Welcome = "Welcome To My Page";

  isButtonDisabled : boolean = true;

  isLoggedIn = true;


  message = "Clicking";
  onClick()
  {
    this.message = "clicked";
    alert("yey clicked!!");
  }

  user = { name: 'Alice' };

    toggleAuth()
  {
    this.isLoggedIn = !this.isLoggedIn;
  }

  products =
  [
    {productname:'Alaska', Price:2500, Availability:'Available'},
    {productname:'Bearbrand', Price:1000, Availability:'Sold Out'},
  ]

  constructor() { }

  ngOnInit() {
  }

}
