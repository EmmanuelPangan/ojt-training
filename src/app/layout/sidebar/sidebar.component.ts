// sidebar.component.ts
import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isClosed = true;

  constructor(private sidebarService: SidebarService) { }

  ngOnInit() {
    this.sidebarService.isClosed$.subscribe(value => {
      this.isClosed = value;
    });
  }
}
