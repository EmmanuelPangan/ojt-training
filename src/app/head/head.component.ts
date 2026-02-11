import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  @Output() logoClick = new EventEmitter<void>();

  toggleSidebar()
  {
    this.logoClick.emit();
  }

  toggleAbout()
  {
    
  }

  onLogoClick (event:MouseEvent)
  {
    event.preventDefault();
    event.stopPropagation();
    this.logoClick.emit();
  }

  constructor(private auth: AuthService, private router: Router) { }

  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  onAuthClick(): void {
    if (this.auth.isLoggedIn()) {
      this.auth.logout();
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
  }

  goToOrders(tab: 'add' | 'edit' | 'delete') {
  this.router.navigate(['/orders'], {
    queryParams: { tab }
  });
}

}
