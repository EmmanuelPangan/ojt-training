import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private baseUrl = 'https://apidev.usl.edu.ph/api/PublicAPI';

  constructor(private http:HttpClient) { }

  getProvinces() : Observable<any[]>
  {
    return this.http.get<any[]>(`${this.baseUrl}/Provinces`);
  }

  getTownsCities(province: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/TownsCities/${province}`);
}

  getBarangays(province: string, townCity: string) : Observable<any[]>
  {
    return this.http.get<any[]>
    (`${this.baseUrl}/Barangays/${province}/${townCity}`);
  }

  saveLocation(data:any): Observable<any>
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/saveLocation`, data, { headers });
  }


}
