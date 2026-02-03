import { Component, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  @Output() logoClick = new EventEmitter<void>();

  toggleSidebar ()
  {
    this.logoClick.emit();
  }

  constructor() { }

  ngOnInit() {
  }

}
