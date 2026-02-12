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
  }A

  showHeaderAgain()
  {
    this.showHeader = true
  }
}
