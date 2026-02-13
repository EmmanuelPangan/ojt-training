import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  
  private baseUrl = environment.apiBaseUrl;
  constructor(private http:HttpClient, private toastr: ToastrService) { }

  getProvinces() : Observable<any[]>
  {
    return this.http
      .get<any[]>(`${this.baseUrl}/Provinces`)
      .pipe(catchError(this.handleArrayError<any[]>('getProvinces', [])));
  }

  getTownsCities(province: string): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}/TownsCities/${province}`)
      .pipe(catchError(this.handleArrayError<any[]>('getTownsCities', [])));
  }

  getBarangays(province: string, townCity: string) : Observable<any[]>
  {
    return this.http
      .get<any[]>(`${this.baseUrl}/Barangays/${province}/${townCity}`)
      .pipe(catchError(this.handleArrayError<any[]>('getBarangays', [])));
  }

  saveLocation(data:any): Observable<any>
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post(`${this.baseUrl}/saveLocation`, data, { headers })
      .pipe(catchError(this.handleRequestError('saveLocation')));
  }

  private handleArrayError<T>(operation: string, fallbackValue: T) {
    return (error: any): Observable<T> => {
      console.error(`LocationService ${operation} failed`, error);
      this.toastr.error('Unable to load location data. Please try again.', 'Request Failed');
      return of(fallbackValue);
    };
  }

  private handleRequestError(operation: string) {
    return (error: any): Observable<never> => {
      console.error(`LocationService ${operation} failed`, error);
      this.toastr.error('Unable to save location. Please try again.', 'Request Failed');
      return throwError(() => error);
    };
  }

}
