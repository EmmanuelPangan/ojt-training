import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.css']
})
export class MypageComponent implements OnInit {

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
