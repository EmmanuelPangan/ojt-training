import { Component, OnInit } from "@angular/core";
import { ApiService } from "./api.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  apiData: any;
  title = "ojt-training";
  isSidebarClosed = true;
  onSidebarChange(state: boolean) {
    this.isSidebarClosed = state;
  }
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // this.fetchData();
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
