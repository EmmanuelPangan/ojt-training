import { Component, OnInit } from '@angular/core';
import { ShareDataService } from '../share-data.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  Welcome = "Welcome To My Page";
    InterSentence = "This is Interpolation, I hope you like it!!";

  isButtonDisabled : boolean = true;

  isLoggedIn = true;

  data = '';



  constructor( private sharedData: ShareDataService)
  {
    this.sharedData.data$.subscribe(value => {
      this.data = value;
    });
  }


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


  ngOnInit() {
  }

}
