import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  Welcome = "Welcome To My Page";

  isButtonDisabled : boolean = true;



  message = "Clicking";
  onClick()
  {
    this.message = "clicked";
    alert("yey clicked!!");
  }

  isLoggedIn = true;
  user = { name: 'Alice' };

  onLogout()
  {
    this.isLoggedIn = false;
  }


  constructor() { }

  ngOnInit() {
  }

}
