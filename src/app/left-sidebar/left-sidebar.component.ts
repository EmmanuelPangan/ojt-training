import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent implements OnInit {

  @Input() isOpen = false;
  @Output() sidebarItemClick = new EventEmitter<void>();
  @Output() sidebarMouseLeave = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  onSidebarItemClick(): void {
    this.sidebarItemClick.emit();
  }

  onSidebarMouseLeave(): void {
    this.sidebarMouseLeave.emit();
  }
}
