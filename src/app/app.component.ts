import { Component, OnInit } from "@angular/core";
import { ApiService } from "./api.service";
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  apiData: any;
  title = "ojt-training";
  isSidebarClosed = false;
  showSidebar = true;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showSidebar = event.url !== '/login';
      }
    });
  }

  onSidebarChange(state: boolean) {
    this.isSidebarClosed = state;
  }

  fetchData(): void {
    this.apiService.getData().subscribe({
      next: data => {
        this.apiData = data;
        console.log("Data received:", this.apiData);
      },
      error: error => {
        console.error("Error fetching data:", error);
      },
      complete: () => {
        console.log("API call completed");
      }
    });



  }
}
