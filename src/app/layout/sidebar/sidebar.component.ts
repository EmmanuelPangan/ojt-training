import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isClosed = true;

  @Output() statusChange = new EventEmitter<boolean>();

  openSidebar() {
    this.isClosed = false;
    this.statusChange.emit(this.isClosed);
  }

  closeSidebar() {
    this.isClosed = true;
    this.statusChange.emit(this.isClosed);
  }


}
