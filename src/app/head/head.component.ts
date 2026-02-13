import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AlertServiceService } from '../alert/alert-service.service';
@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  @Output() logoClick = new EventEmitter<void>();
  @Input() hideRightButtons = false;

  toggleSidebar()
  {
    this.logoClick.emit();
  }

  toggleAbout()
  {
    
  }



  constructor(private auth: AuthService, private router: Router, private alertService: AlertServiceService) { }

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

  onLogoClick (event:MouseEvent)
  {
    event.preventDefault();
    event.stopPropagation();

    if (!this.auth.isLoggedIn())
    {
      this.alertService.error('You must be logged in to access this page.');
      this.router.navigate(['/login']);
      return;
    }
    this.logoClick.emit();
  }

}
