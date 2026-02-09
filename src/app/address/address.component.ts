import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";
@Component({
  selector: "app-address",
  templateUrl: "./address.component.html",
  styleUrls: ["./address.component.css"]
})
export class AddressComponent implements OnInit {
  selectedProvince = "";
  selectedTownCity = "";
  selectedBarangays = "";
  province;
  townsCities;
  barangays;
  constructor(private apiUrl: ApiService) { }

  ngOnInit() {
    this.getProvince();
  }
  getProvince() {
    this.apiUrl.getProvinces().subscribe(
      data => {
        this.province = data;
        console.log("province", this.province);
        this.selectedTownCity = null;
      },
      error => {
        console.log(error);
      }
    );
  }

  getTownsCities(p) {
    this.selectedProvince = p;
    this.apiUrl.getTownsCities(p).subscribe(
      data => {
        this.townsCities = data;
        console.log("townsCities", this.townsCities);
        this.selectedBarangays = null;
      },
      error => {
        console.log(error);
      }
    );
  }

  getBarangays(p, t) {
    this.apiUrl.getBarangays(p, t).subscribe(
      data => {
        this.barangays = data;
        console.log("barangays", this.barangays);
      },
      error => {
        console.log(error);
      }
    );
  }

  savedAddress() {
    if (this.selectedProvince && this.selectedTownCity && this.selectedBarangays) {
      alert(`Address saved successfully!\n`);
    }
    else {
      alert("Please select Province, Town/City, and Barangay before saving.");
    }
  }
}
