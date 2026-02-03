import { Component } from '@angular/core';
import { Router , NavigationEnd} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ojt-training';

  isSidebarOpen = false;
  showHeader = true;
  constructor(private router:Router)
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
  }

  showHeaderAgain()
  {
    this.showHeader = true
  }
}
