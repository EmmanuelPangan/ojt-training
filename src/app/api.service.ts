import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class ApiService {
  apiUrl = "https://apidev.usl.edu.ph/api/";
  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  getProvinces(): Observable<any> {
    return this.http.get(this.apiUrl + "PublicAPI/Provinces");
  }

  getTownsCities(province): Observable<any> {
    return this.http.get(this.apiUrl + "PublicAPI/TownsCities/" + province);
  }

  getBarangays(province, townsCities): Observable<any> {
    return this.http.get(
      this.apiUrl + "PublicAPI/Barangays/" + province + "/" + townsCities
    );
  }

}
