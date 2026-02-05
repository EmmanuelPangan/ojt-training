import { Component, Input } from '@angular/core';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isMenuOpen = false;

  @Input() title!: string;

  constructor(public authService: AuthService) { }
  logout() {
    this.authService.logout();
  }

}
