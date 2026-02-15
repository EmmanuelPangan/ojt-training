import { Component } from '@angular/core';
import { Router , NavigationEnd} from '@angular/router';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ojt-training';

  isSidebarOpen = false;
  hideRightButtonsOnMobile = false;
  showHeader = true;
  constructor(private router:Router, private authService:AuthService)
  {
    this.router.events.subscribe(event => 
    {
      this.showHeader = false;
    }
    );
  }

  toggleSidebar ()
  {
    this.isSidebarOpen = !this.isSidebarOpen;
    if (this.isSmallDevice()) {
      this.hideRightButtonsOnMobile = this.isSidebarOpen;
    } else {
      this.hideRightButtonsOnMobile = false;
    }
  }

  onSidebarInteraction(): void {
    if (this.isSmallDevice()) {
      this.hideRightButtonsOnMobile = true;
    }
  }

  onMainContentClick(): void {
    if (!this.isSidebarOpen) {
      return;
    }

    this.isSidebarOpen = false;
    this.hideRightButtonsOnMobile = false;
  }

  onSidebarMouseLeave(): void {
    if (!this.isSidebarOpen || !this.isHoverDevice()) {
      return;
    }

    this.isSidebarOpen = false;
    this.hideRightButtonsOnMobile = false;
  }

  private isSmallDevice(): boolean {
    return window.matchMedia('(max-width: 640px)').matches;
  }

  private isHoverDevice(): boolean {
    return window.matchMedia('(hover: hover)').matches;
  }

  showHeaderAgain()
  {
    this.showHeader = true
  }
}
