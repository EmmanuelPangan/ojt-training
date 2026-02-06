import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-excercise',
  templateUrl: './excercise.component.html',
  styleUrls: ['./excercise.component.css']
})
export class ExcerciseComponent implements OnInit {

  title = 'LOG IN';
  username = 'bea';
  age = "22";
  disable = true;
  values = "";

  onclick() {
    this.values = "hi";

  }
  login = false;
  Click() {
    this.login = true;
  }
  users = ['bea', 'kei', 'claire'];

  today: number = Date.now();
  constructor() { }

  ngOnInit() {
  }

}
