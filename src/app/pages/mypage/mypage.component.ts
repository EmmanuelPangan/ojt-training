import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.css']
})
export class MypageComponent implements OnInit {

  title = 'Trial and Error';
  name = 'Bea B.';
  Disabled = true;
  values = '';

  onClick() {
    this.values = 'hi';
  }




  constructor() { }


  ngOnInit() {
  }

}
