// header.component.ts
import { Component, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { SidebarService } from '../sidebar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input() title!: string;

  constructor(
    public authService: AuthService,
    private sidebarService: SidebarService,
    private router: Router
  ) { }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleSidebar() {
    this.sidebarService.toggle();
  }
}
