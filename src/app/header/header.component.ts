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
  onSave()
  {
    this.message = "clicked";
    alert("yey clicked!!");
  }

  constructor() { }

  ngOnInit() {
  }

}
