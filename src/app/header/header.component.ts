import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  Welcome = "Welcome To My Page";
  logInButton = "Log Out";

  isButtonDisabled : boolean = true;



  message = "Clicking";
  onClick()
  {
    this.message = "clicked";
    alert("yey clicked!!");
  }

  isLoggedIn = true;
  user = { name: 'Alice' };

    onAuth()
  {
    this.isLoggedIn = !this.isLoggedIn;
  }



  constructor() { }

  ngOnInit() {
  }

}
