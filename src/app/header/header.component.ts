// header.component.ts
import { Component, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { SidebarService } from '../sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input() title!: string;

  constructor(
    public authService: AuthService,
    private sidebarService: SidebarService
  ) { }

  logout() {
    this.authService.logout();
  }

  toggleSidebar() {
    this.sidebarService.toggle();
  }
}
